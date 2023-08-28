import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(mode);
    //setHistory((prev) => [...prev, mode]);
    setHistory(newHistory);
    //console.log(history);
  }

  function back() {
    const newHistory = [...history];
    if (newHistory.length - 1) newHistory.pop();
    setHistory(newHistory);
  }

  return { mode: history[history.length - 1], transition, back };
}
