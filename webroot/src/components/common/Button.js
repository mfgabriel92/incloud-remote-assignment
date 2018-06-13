import React, {Component} from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Button extends Component {
  render() {
    const { text, className, onClick, format } = this.props;

    return (
      <button
        type="button"
        className={cx("btn " + className + (format === "round" ? " btn-round" : " "))}
        onClick={onClick}>
        {text}
      </button>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  format: PropTypes.string,
};

Button.defaultProps = {
  text: "Submit",
  format: "rectangular"
};

export default Button;