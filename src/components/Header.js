/** A reusable user-defined component, as opposed to DOM components
 *  Shorhand: 'rafce' via 'dsznajder.es7-react-js-snip'
 *  Importing react is not required when writing components using functions,
 *  but is required when using classes.
 */

/**
 * A component is just a js function
 * which can take arbitrary inputs
 * (aka "props" which stands for "properties"),
 * and return React elements.
 */

import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

// const Header = (props) => {
// destructuring "props"
const Header = ({ title, onToggleAddTask, showAddTask }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          bgColor={showAddTask ? "darkred" : "green"}
          text={showAddTask ? "Cancel" : "Add"}
          onClick={onToggleAddTask}
        />
      )}
    </header>
  );
};

// Default props
Header.defaultProps = {
  title: "Default Header",
};

// Default props type, to make the code more robust
Header.propTypes = {
  title: PropTypes.string.isRequired,
  onToggleAddTask: PropTypes.func,
};

export default Header;
