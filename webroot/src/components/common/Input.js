import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
  render() {
    const { type, name, value, className, onChange, disabled } = this.props;

    return (
      <input
        type={type}
        name={name}
        value={value}
        className={className}
        onChange={onChange}
        disabled={disabled}
      />
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Input.defaultProps = {
  type: "text",
  disabled: false
};

export default Input;