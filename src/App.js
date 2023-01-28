import "./App.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sample from "./passage";
import { percentageFormat, wpmFormat } from "./localization";

const Letter = ({ char, status }) => {
  return <span className={status}>{char}</span>;
};

Letter.propTypes = {
  status: PropTypes.oneOf(["current", "", "correct", "incorrect"]),
  char: PropTypes.string,
};

const App = () => {
  const [passage, setPassage] = useState(
    sample.split("").map((character) => ({ expected: character, actual: "" }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numKeyPresses, setNumKeyPresses] = useState(0);
  const [numCorrectKeyPresses, setNumCorrectKeyPresses] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [finished, setFinished] = useState(false);

  const keydownHandler = ({ key, repeat, altKey, ctrlKey, metaKey }) => {
    // Bail out if we are done with the passage
    if (finished) return;

    // Bail out if any key was pressed that we do not care about
    if (altKey || ctrlKey || metaKey || key === "Shift") return;

    // Bail out if backspace was pressed at the start
    if (key === "Backspace" && currentIndex <= 0) {
      return;
    }

    // Go to the previous character if backspace was pressed, and we are not at the start
    if (key === "Backspace" && currentIndex > 0) {
      const newPassage = [...passage];
      newPassage[currentIndex].actual = "";
      setPassage(newPassage);
      setCurrentIndex((prevIndex) => prevIndex - 1);
      return;
    }

    // If the timer isn't already running, start it
    if (!timerIsRunning) {
      setTimerIsRunning(true);
    }

    // Go to the next character if the key is not being held down from the previous
    if (!repeat) {
      setNumKeyPresses(numKeyPresses + 1);
      if (passage[currentIndex].expected === key) {
        setNumCorrectKeyPresses(numCorrectKeyPresses + 1);
      }

      const newPassage = [...passage];
      newPassage[currentIndex].actual = key;
      setPassage(newPassage);
      setCurrentIndex((prevIndex) => prevIndex + 1);

      // Bail out if we are at the end
      if (currentIndex >= passage.length - 1) {
        setTimerIsRunning(false);
        setFinished(true);
      }
    }
  };

  // Register keyboard event listener on the window
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  });

  // Calculate accuracy and WPM whenever numKeyPresses or numCorrectKeyPresses is updated
  useEffect(() => {
    if (numKeyPresses === 0) {
      setAccuracy(0);
      setWpm(0);
    } else {
      setAccuracy(numCorrectKeyPresses / numKeyPresses);
      setWpm(numCorrectKeyPresses / 5 / (seconds / 60));
    }
  }, [numKeyPresses, numCorrectKeyPresses, seconds]);

  // Handle the timer
  useEffect(() => {
    let interval = undefined;
    if (timerIsRunning) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerIsRunning]);

  return (
    <div className="App">
      <div className="workspace">
        {passage.map((char, i) => (
          <Letter
            key={i}
            status={
              i === currentIndex
                ? "current"
                : char.expected === char.actual
                ? "correct"
                : char.actual === ""
                ? ""
                : "incorrect"
            }
            char={char.expected}
          />
        ))}
      </div>

      <footer>
        <p>Accuracy: {percentageFormat.format(accuracy).padStart(7)}</p>
        <p>WPM: {wpmFormat.format(wpm).padStart(7)}</p>
      </footer>
    </div>
  );
};

export default App;
