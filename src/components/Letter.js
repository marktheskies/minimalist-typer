import styled from "styled-components";
import PropTypes from "prop-types";

const StyledLetter = styled.span`
  color: ${(props) =>
    props.status === "incorrect"
      ? props.theme.white
      : props.status === "correct"
      ? props.theme.dark
      : props.theme.light};
  background-color: ${(props) =>
    props.status === "incorrect" ? props.theme.danger : props.theme.white};
  border-bottom: ${(props) =>
    props.status === "current" ? `2px solid` : "none"};
  padding-bottom: 1px;
`;

StyledLetter.propTypes = {
  status: PropTypes.oneOf(["current", "", "correct", "incorrect"]),
};

export default StyledLetter;
