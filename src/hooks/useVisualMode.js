import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    //const newHistory = [...history];
    if (replace) {
      //newHistory.pop();
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
    //newHistory.push(mode);
    //setHistory((prev) => [...prev, mode]);
    //setHistory(newHistory);
    //console.log("visual", history);
  }

  function back() {
    //const newHistory = [...history];
    if (history.length > 1) {
      // newHistory.pop();
      setHistory((prev) => prev.slice(0, prev.length - 1));
      return;
    }
    //setHistory(newHistory);
  }

  return { mode: history[history.length - 1], transition, back };
}
