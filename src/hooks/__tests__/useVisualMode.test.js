// Import necessary testing utilities and the custom hook.
import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";

// Define constants for different modes.
const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

// Test case to check if useVisualMode initializes with the default value.
test("useVisualMode should initialize with default value", () => {
  // Render the hook with an initial mode of FIRST.
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Assert that the current mode is equal to FIRST.
  expect(result.current.mode).toBe(FIRST);
});

// Test case to check if useVisualMode can transition to another mode.
test("useVisualMode should transition to another mode", () => {
  // Render the hook with an initial mode of FIRST.
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Transition to the SECOND mode.
  act(() => result.current.transition(SECOND));

  // Assert that the current mode is now SECOND.
  expect(result.current.mode).toBe(SECOND);
});

// Test case to check if useVisualMode can return to the previous mode.
test("useVisualMode should return to previous mode", () => {
  // Render the hook with an initial mode of FIRST.
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Transition to the SECOND mode.
  act(() => result.current.transition(SECOND));
  // Assert that the current mode is SECOND.
  expect(result.current.mode).toBe(SECOND);

  // Transition to the THIRD mode.
  act(() => result.current.transition(THIRD));
  // Assert that the current mode is THIRD.
  expect(result.current.mode).toBe(THIRD);

  // Go back to the previous mode.
  act(() => result.current.back());
  // Assert that the current mode is now SECOND.
  expect(result.current.mode).toBe(SECOND);

  // Go back to the initial mode.
  act(() => result.current.back());
  // Assert that the current mode is now FIRST.
  expect(result.current.mode).toBe(FIRST);
});

// Test case to check if useVisualMode does not return to previous mode if already at the initial mode.
test("useVisualMode should not return to previous mode if already at initial", () => {
  // Render the hook with an initial mode of FIRST.
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Attempt to go back to the previous mode.
  act(() => result.current.back());

  // Assert that the current mode is still FIRST since there is no previous mode.
  expect(result.current.mode).toBe(FIRST);
});

// Test case to check if useVisualMode can replace the current mode.
test("useVisualMode should replace the current mode", () => {
  // Render the hook with an initial mode of FIRST.
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Transition to the SECOND mode.
  act(() => result.current.transition(SECOND));
  // Assert that the current mode is SECOND.
  expect(result.current.mode).toBe(SECOND);

  // Transition to the THIRD mode, replacing SECOND.
  act(() => result.current.transition(THIRD, true));
  // Assert that the current mode is now THIRD.
  expect(result.current.mode).toBe(THIRD);

  // Go back to the initial mode.
  act(() => result.current.back());
  // Assert that the current mode is now FIRST.
  expect(result.current.mode).toBe(FIRST);
});
