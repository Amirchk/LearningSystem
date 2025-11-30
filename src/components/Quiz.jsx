import React, { useState } from "react";

const Quiz = ({ questions = [], onClose, onFinish }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div>
        <p>No quiz available.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  const q = questions[index];

  const handleSelect = (opt) => {
    if (showAnswer) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setShowAnswer(true);
  };

  const next = () => {
    setSelected(null);
    setShowAnswer(false);
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      // quiz finished -> call onFinish callback with score & total
      if (typeof onFinish === "function") onFinish(score, questions.length);
    }
  };

  return (
    <div>
      <h4>Question {index + 1} / {questions.length}</h4>
      <p>{q.question}</p>

      <div>
        {q.options.map((opt) => {
          const isCorrect = showAnswer && opt === q.answer;
          const isSelected = selected === opt;
          const style = {
            display: "block",
            margin: 6,
            padding: 8,
            background: isCorrect ? "#d4edda" : (showAnswer && isSelected && !isCorrect ? "#f8d7da" : undefined),
            border: isSelected && !showAnswer ? "2px solid #1976d2" : undefined,
            cursor: showAnswer ? "default" : "pointer"
          };
          return (
            <button key={opt} style={style} onClick={() => handleSelect(opt)} disabled={showAnswer}>
              {opt}
            </button>
          );
        })}
      </div>

      {showAnswer ? (
        <div>
          <p>{selected === q.answer ? "Correct ✅" : `Incorrect — correct: ${q.answer || "N/A"}`}</p>
          <button onClick={next}>{index + 1 < questions.length ? "Next" : "Finish"}</button>
        </div>
      ) : (
        <p>Select an option to submit.</p>
      )}
    </div>
  );
};

export default Quiz;