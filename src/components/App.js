import { useEffect, useState } from "react";
import styled from "styled-components";
import StyledLetter from "./Letter";
import StyledFooter from "./Footer";
import quotes from "../utils/quotes";

const StyledWorkspace = styled.main`
  width: 100%;
  max-width: ${(props) => props.theme.maxAppWidth};
  font-size: 1.35em;
  text-align: justify;
`;

const App = ({ className }) => {
  const [passage, setPassage] = useState([]);
  const [passageMeta, setPassageMeta] = useState({
    author: "",
    authorSlug: "",
    length: 0,
    tags: [],
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numKeyPresses, setNumKeyPresses] = useState(0);
  const [numCorrectKeyPresses, setNumCorrectKeyPresses] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [finished, setFinished] = useState(false);

  const setQuoteToRandomQuote = () => {
    const i = Math.floor(Math.random() * (quotes.length - 1));
    const quote = quotes[i];
    setPassage(
      quote.content
        .split("")
        .map((character) => ({ expected: character, actual: "" }))
    );
    setPassageMeta({
      author: quote.author,
      authorSlug: quote.authorSlug,
      length: quote.length,
      tags: quote.tags,
    });

    // Hard reset
    setCurrentIndex(0);
    setNumKeyPresses(0);
    setNumCorrectKeyPresses(0);
    setAccuracy(0);
    setTimerIsRunning(false);
    setSeconds(0);
    setWpm(0);
    setFinished(false);
  };

  // Grab a random quote on first render
  useEffect(() => {
    setQuoteToRandomQuote();
  }, []);

  const keydownHandler = ({ key, repeat, altKey, ctrlKey, metaKey }) => {
    // Bail out if we are done with the passage
    if (finished) return;

    // Bail out if any key was pressed that we do not care about
    if (altKey || ctrlKey || metaKey || key === "Shift" || key === "Escape")
      return;

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

  const newQuoteClickHandler = (event) => {
    event.target.blur();
    setQuoteToRandomQuote();
  };

  return (
    <div className={className}>
      <StyledWorkspace>
        {passage.map((char, i) => (
          <StyledLetter
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
          >
            {char.expected}
          </StyledLetter>
        ))}
      </StyledWorkspace>

      <StyledFooter
        author={passageMeta.author}
        newQuoteClickHandler={newQuoteClickHandler}
        accuracy={accuracy}
        wpm={wpm}
      />
    </div>
  );
};

const StyledApp = styled(App)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightBase};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default StyledApp;
