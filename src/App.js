import "./App.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sample from "./passage";

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

  const keydownHandler = ({ key, repeat, altKey, ctrlKey, metaKey }) => {
    // Bail out if any key was pressed that we do not care about
    if (altKey || ctrlKey || metaKey || key === "Shift") return;

    // Bail out if we are at the end
    if (currentIndex >= passage.length - 1) {
      console.log("You're done");
      return;
    }

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

    // Go to the next character if the key is not being held down from the previous
    if (!repeat) {
      const newPassage = [...passage];
      newPassage[currentIndex].actual = key;
      setPassage(newPassage);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Register keyboard event listener on the window
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  });

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
    </div>
  );
};

export default App;
