import { useState } from "react";

// Custom hook for managing visual modes and history
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  // Function to transition to a new mode, optionally replacing the current mode
  function transition(mode, replace = false) {
    if (replace) {
      // Replace the last mode in history with the new mode
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      // Add the new mode to history
      setHistory((prev) => [...prev, mode]);
    }
  }

  // Function to go back to the previous mode in history
  function back() {
    if (history.length > 1) {
      // Remove the last mode from history
      setHistory((prev) => prev.slice(0, prev.length - 1));
      return;
    }
  }

  // Return the current mode and relevant functions
  return { mode: history[history.length - 1], transition, back };
}
