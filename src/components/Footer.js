import styled from "styled-components";
import PropTypes from "prop-types";
import { percentageFormat, wpmFormat } from "../utils/localization";

const StyledLeft = styled.div`
  text-align: left;
  white-space: pre-wrap;
`;

const StyledRight = styled.div`
  text-align: right;
  white-space: pre-wrap;
`;

const StyledButton = styled.button`
  cursor: pointer;
`;

const Footer = ({ className, author, newQuoteClickHandler, accuracy, wpm }) => (
  <footer className={className}>
    <StyledLeft>
      <div>Author: {author}</div>
      <div>
        <StyledButton className="button" onClick={newQuoteClickHandler}>
          New quote →
        </StyledButton>
      </div>
    </StyledLeft>
    <StyledRight>
      <div>Accuracy: {percentageFormat.format(accuracy).padStart(7)}</div>
      <div>WPM: {wpmFormat.format(wpm).padStart(7)}</div>
    </StyledRight>
  </footer>
);

const StyledFooter = styled(Footer)`
  padding: 2.25em 0;
  width: 100%;
  max-width: ${(props) => props.theme.maxAppWidth};
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.dark};
`;

StyledFooter.propTypes = {
  author: PropTypes.string.isRequired,
  newQuoteClickHandler: PropTypes.func.isRequired,
  accuracy: PropTypes.number.isRequired,
  wpm: PropTypes.number.isRequired,
};

export default StyledFooter;
