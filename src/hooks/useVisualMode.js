import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      history.pop();
    }
    setHistory((prev) => [...prev, mode]);
  }

  function back() {
    const newHistory = [...history];
    if (newHistory.length - 1) newHistory.pop();
    setHistory(newHistory);
  }

  return { mode: history[history.length - 1], transition, back };
}
