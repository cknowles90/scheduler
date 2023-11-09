import { useState } from "react";

const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory((prev) => {
        const updatedHistory = replace
          ? [...prev.slice(0, prev.length - 1), newMode]
          : [...prev, newMode]

        return updatedHistory;
    });
  };

  const back = () => {
    setHistory((prev) => {
      if(prev.length > 1) {
        const updatedHistory = [...prev.slice(0, prev.length - 1)];
        return updatedHistory;
      }
      return prev;
  });
};

  return { 
    mode: history[history.length - 1],
    transition,
    back,
  };
}

export default useVisualMode;
