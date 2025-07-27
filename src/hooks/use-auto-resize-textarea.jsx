import { useRef, useCallback } from 'react';

export function useAutoResizeTextarea({ minHeight = 56, maxHeight = 200 } = {}) {
  const textareaRef = useRef(null);

  const adjustHeight = useCallback((reset = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (reset) {
      textarea.style.height = `${minHeight}px`;
      return;
    }

    textarea.style.height = `${minHeight}px`;
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [minHeight, maxHeight]);

  return { textareaRef, adjustHeight };
}
