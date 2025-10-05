import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const initialMode = () => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  };

  const [darkMode, setDarkMode] = useState(initialMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode
      ? 'var(--background-dark)'
      : 'var(--background-light)';

    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
};
