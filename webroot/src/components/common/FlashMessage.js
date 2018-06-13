import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import cx from "classnames";

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
    };
  }

  componentDidMount() {
    const { flash: { message } } = this.props;
    message && this.hideMessage();
  }

  componentWillReceiveProps(nextProps) {
    const { flash: { message } } = nextProps;
    message && this.hideMessage();
  }

  hideMessage = () => {
    this.setState({ hide: false });

    setTimeout(() => {
      this.setState({ hide: true });
    }, 4000);
  };

  render() {
    const {
      flash: {
        message,
        type
      }
    } = this.props;

    const { hide } = this.state;

    let modalClass;
    let icon;

    switch (type) {
      case "success":
        modalClass = "alert-success";
        icon = "check";
        break;
      case "processing":
        modalClass = "alert-warning";
        icon = "clock-o";
        break;
      case "error":
        modalClass = "alert-danger";
        icon = "close";
        break;
      default:
        modalClass = "alert-default";
        icon = "question";
        break;
    }

    return (
      !hide && typeof message !== "object" && <div className={cx("text-center alert", modalClass)}>
        <FontAwesome name={icon} className="flash-file-icon"/>
        <span style={{marginLeft: 15 + "px"}}>
          {message}
        </span>
      </div>
    )
  }
}

export default FlashMessage;
