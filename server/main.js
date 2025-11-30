import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import authRoutes from "./routes/auth.js";
import StudyGroup from "./models/StudyGroup.js";

dotenv.config();

const app = express();
const uri = "mongodb+srv://amirhassan032_db_user:CPLS@cluster0.rivt1ee.mongodb.net/";

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// RapidAPI config
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "10d9e6ae41msh1f9758494c52cf6p10886cjsnb835fdedaa0e";
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "chatgpt-42.p.rapidapi.com";
const RAPIDAPI_PATH = process.env.RAPIDAPI_PATH || "/gpt4";
if (!RAPIDAPI_KEY) {
  console.warn("⚠️ RAPIDAPI_KEY not set. /api/generate-quiz will fail until it's configured.");
}

// Routes
app.use("/", authRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Express server running");
});

// Create a new study group
app.post("/studygroup", async (req, res) => {
  const { name, subjects, description, meetingTime, membership } = req.body;
  if (!name) return res.status(400).json({ message: "Group name is required" });

  try {
    const newGroup = new StudyGroup({ name, subjects, description, meetingTime, membership });
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Helper: call RapidAPI endpoint and return response body (string)
function callRapidChat(payload) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      hostname: RAPIDAPI_HOST,
      port: null,
      path: RAPIDAPI_PATH,
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        try {
          const body = Buffer.concat(chunks).toString();
          resolve(body);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.write(JSON.stringify(payload));
    req.end();
  });
}

/* helper: local fallback quiz generator */
function generateLocalQuiz(topics = []) {
  const baseTopics = Array.isArray(topics) && topics.length ? topics : ["General CS"];
  const questions = [];
  for (let i = 0; i < 10; i++) {
    const topic = baseTopics[i % baseTopics.length];
    const qText = `Sample question ${i + 1} about ${topic}: Which option is correct?`;
    const correct = `Correct answer for ${topic}`;
    const opts = [
      correct,
      `Incorrect A for ${topic}`,
      `Incorrect B for ${topic}`,
      `Incorrect C for ${topic}`,
    ];
    for (let j = opts.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [opts[j], opts[k]] = [opts[k], opts[j]];
    }
    questions.push({ question: qText, options: opts, answer: correct });
  }
  return questions;
}

/* helper: sleep */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* helper: parse markdown/plain text quiz to structured questions */
function parseQuizTextToQuestions(text) {
  if (!text || typeof text !== "string") return null;
  const qBlocks = [];
  // normalize line endings
  const normalized = text.replace(/\r\n/g, "\n");
  // find question blocks starting with number + '.' or number + ')'
  const questionRegex = /(?:^|\n)\s*(\d+)[\.\)]\s*([^\n]+)([\s\S]*?)(?=(?:\n\s*\d+[\.\)]\s)|$)/g;
  let m;
  while ((m = questionRegex.exec(normalized)) !== null) {
    const qIndex = m[1];
    let qText = m[2].trim();
    let rest = m[3] || "";
    // extract options a/b/c/d lines
    const options = [];
    const optionRegex = /(?:^|\n)\s*(?:\*?\s*)?(?:a\)|a\.)\s*([^\n]+)|(?:^|\n)\s*(?:\*?\s*)?(?:b\)|b\.)\s*([^\n]+)|(?:^|\n)\s*(?:\*?\s*)?(?:c\)|c\.)\s*([^\n]+)|(?:^|\n)\s*(?:\*?\s*)?(?:d\)|d\.)\s*([^\n]+)/gi;
    // simpler: capture lines that start with letter and ) or ) followed by spaces
    const optLineRegex = /(?:^|\n)\s*([a-dA-D])\)|\s*([a-dA-D])\.\s*/;
    // generic option capture: lines starting with a) or a. or dash lists
    const genericOptRegex = /(?:^|\n)\s*(?:[-*\s]*)?(?:[a-dA-D][\)\.]|[a-dA-D]\s\))\s*([^\n]+)/g;
    let go = genericOptRegex.exec(rest);
    // collect up to 4 options by scanning lines
    const lines = rest.split("\n");
    for (const line of lines) {
      const opMatch = line.match(/^\s*(?:\*?\s*)?(?:[a-dA-D][\)\.]|\([a-dA-D][\)\.])\s*([^\n]+)/);
      if (opMatch && options.length < 4) {
        options.push(opMatch[1].trim());
      } else {
        // support lines like "a) Option" without paren pattern
        const alt = line.match(/^\s*[a-dA-D]\s*[\)\.]?\s*([^\n]+)/);
        if (alt && alt[1] && options.length < 4) {
          options.push(alt[1].trim());
        }
      }
      if (options.length >= 4) break;
    }
    // fallback: try to extract inline 'a) ... b) ...' patterns
    if (options.length === 0) {
      const inlineRegex = /[a-dA-D]\)\s*([^a-dA-D]+)/g;
      let inMatch;
      while ((inMatch = inlineRegex.exec(rest)) && options.length < 4) {
        const val = inMatch[1].trim();
        if (val) options.push(val);
      }
    }

    // if still no options, try to split choices by double spaces with letters
    if (options.length === 0) {
      const altSplit = rest.split(/\s{2,}/).map(s => s.trim()).filter(Boolean);
      if (altSplit.length >= 2) options.push(...altSplit.slice(0, 4));
    }

    // push parsed block
    qBlocks.push({ question: qText, options });
  }

  if (!qBlocks.length) return null;

  // Ensure each question has 4 options; pad if needed
  return qBlocks.map((q, idx) => {
    const opts = Array.isArray(q.options) ? q.options.slice(0, 4) : [];
    while (opts.length < 4) opts.push("None of the above");
    // No reliable correct answer is available in plain text from this provider.
    // We'll set answer to empty string to indicate "unknown" (frontend can handle).
    return { question: q.question, options: opts, answer: "" };
  });
}

// Quiz generation endpoint using RapidAPI (with retry + fallback and smarter parsing)
app.post("/api/generate-quiz", async (req, res) => {
  if (!RAPIDAPI_KEY) {
    console.warn("RapidAPI key missing in env");
    return res.status(500).json({ message: "RapidAPI key not configured on server." });
  }

  try {
    console.log(">> /api/generate-quiz called, body:", JSON.stringify(req.body).slice(0,2000));
    const topicsArr = Array.isArray(req.body.topics) && req.body.topics.length ? req.body.topics : ["general computer science"];
    const topics = topicsArr.join(", ");

    // Strong instruction to provider to return JSON only. Provider may still return `result` text.
    const prompt = `
You are a quiz generator. RETURN ONLY A JSON OBJECT (no extra text, no markdown).
Output MUST be exactly:
{"questions":[{"question":"...","options":["opt1","opt2","opt3","opt4"],"answer":"optX"}, ...]}

Produce exactly 10 multiple-choice questions about: ${topics}
Each "options" array must have 4 distinct strings.
"answer" must match exactly one option string.

If you cannot produce 10, produce as many as you can but still return valid JSON.
`;

    // payload per RapidAPI chat usage (web_access false as before)
    const payload = {
      messages: [
        { role: "user", content: prompt }
      ],
      web_access: false
    };

    let bodyText = null;
    let parsed = null;
    const maxAttempts = 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        bodyText = await callRapidChat(payload);
        console.log(`<< RapidAPI raw response (attempt ${attempt}, truncated):`, (bodyText || "").slice(0,2000));

        // Try parse top-level JSON
        try {
          parsed = JSON.parse(bodyText);
        } catch (parseErr) {
          parsed = null;
        }

        // If provider wraps result in { result: "...", status: ... } handle that case
        if (parsed && typeof parsed === "object" && typeof parsed.result === "string") {
          // try parse parsed.result as JSON first
          try {
            const nested = JSON.parse(parsed.result);
            parsed = nested;
          } catch (e) {
            // parse markdown/plain result into questions
            const derived = parseQuizTextToQuestions(parsed.result);
            if (derived) {
              // attach parsed-like shape
              parsed = { questions: derived };
            } else {
              parsed = null;
            }
          }
        }

        // If bodyText wasn't valid JSON but contains a JSON substring, try to extract it
        if (!parsed) {
          const start = bodyText.indexOf("{");
          const end = bodyText.lastIndexOf("}");
          if (start !== -1 && end !== -1 && end > start) {
            try {
              parsed = JSON.parse(bodyText.slice(start, end + 1));
            } catch (e) {
              parsed = null;
            }
          }
        }

        // If still no parsed.questions, try to extract questions directly from raw text
        if (!parsed || !Array.isArray(parsed.questions)) {
          const fromText = parseQuizTextToQuestions(bodyText);
          if (fromText) parsed = { questions: fromText };
        }

        if (parsed && Array.isArray(parsed.questions)) {
          break;
        } else {
          throw new Error("Invalid JSON or missing questions array");
        }
      } catch (err) {
        console.warn(`RapidAPI attempt ${attempt} failed: ${String(err)}`);
        if (attempt < maxAttempts) {
          await sleep(600 * attempt);
          continue;
        } else {
          parsed = null;
        }
      }
    }

    if (!parsed || !Array.isArray(parsed.questions)) {
      console.warn("RapidAPI unavailable or returned invalid/unsupported data — using local fallback quiz generator.");
      const fallbackQuestions = generateLocalQuiz(topicsArr);
      return res.json({ questions: fallbackQuestions, source: "local-fallback" });
    }

    // Normalize: ensure each question has 4 options & an answer property (may be empty string if unknown)
    const questions = parsed.questions.map((q, idx) => {
      const questionText = typeof q.question === "string" ? q.question.trim() : `Question ${idx + 1}`;
      const options = Array.isArray(q.options) ? q.options.map(o => ("" + o).trim()).filter(Boolean) : [];
      const uniqueOptions = Array.from(new Set(options)).slice(0, 4);
      while (uniqueOptions.length < 4) uniqueOptions.push("None of the above");
      const answer = typeof q.answer === "string" && uniqueOptions.includes(q.answer) ? q.answer : "";
      return { question: questionText, options: uniqueOptions, answer };
    });

    res.json({ questions, source: "rapidapi-parsed" });
  } catch (err) {
    console.error("Error generating quiz:", err);
    const fallbackQuestions = generateLocalQuiz(req.body?.topics || ["general computer science"]);
    res.status(200).json({ questions: fallbackQuestions, source: "local-fallback", error: String(err) });
  }
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
