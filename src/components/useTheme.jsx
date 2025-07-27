import { useEffect, useState } from 'react';

const themes = ['light', 'dark', 'algolia']; // Add your custom themes
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'; // Default to 'dark' if no theme is set
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    themes.forEach((t) => root.classList.remove(t));

    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const currentIndex = themes.indexOf(prev);
      const nextIndex = (currentIndex + 1) % themes.length;
      return themes[nextIndex];
    });
  };

  return { theme, toggleTheme, setTheme };
};
