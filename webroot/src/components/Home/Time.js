import React, {Component} from "react";
import * as workerTimers from "worker-timers";
import Button from "../common/Button";
import FontAwesome from "react-fontawesome";
import moment from "moment";

class Time extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      description: "",
      createdAt: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      isPaused: false,
    };

    this.state = this.defaultState;
  }

  tick = () => {
    const { milliseconds, seconds, minutes, isPaused } = this.state;

    if (milliseconds === 100) {
      this.setState({
        milliseconds: 0,
        seconds: this.state.seconds + 1
      })
    }

    if (seconds === 60) {
      this.setState({
        seconds: 0,
        minutes: this.state.minutes + 1
      })
    }

    if (minutes === 60) {
      this.setState({
        minutes: 0,
        hours: this.state.hours + 1
      })
    }

    if (!isPaused) {
      this.setState({ milliseconds: this.state.milliseconds + 1 });
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  storeTask = () => {
    if (!window.confirm("Do you want to conclude this task?")) {
      return;
    }

    const { storeTask } = this.props;
    const { description, createdAt } = this.state;

    const duration = this.showTime().toString();
    const data = {
      description,
      createdAt,
      concludedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      duration
    };

    this.setState({ ...this.defaultState });
    workerTimers.clearInterval(this.timer);

    storeTask(data);
  };

  startTimer = () => {
    this.setState({ createdAt: moment().format("YYYY-MM-DD HH:mm:ss") });
    this.timer = workerTimers.setInterval(this.tick, 10);
  };

  resumeTimer = () => {
    this.setState({ isPaused: false });
  };

  pauseTimer = () => {
    this.setState({ isPaused: true });
  };

  showTime = () => {
    const { seconds, minutes, hours } = this.state;

    let h = hours < 1 ? "00" : hours < 10 ? `0${hours}` : hours;
    let m = minutes < 1 ? "00" : minutes < 10 ? `0${minutes}` : minutes;
    let s = seconds < 1 ? "00" : seconds < 10 ? `0${seconds}` : seconds;

    return `${h}:${m}:${s}`;
  };

  showButtons = () => {
    const { isPaused, milliseconds } = this.state;

    if (milliseconds === 0) {
      return (
        <Button
          className="btn-primary btn-sm"
          onClick={() => this.startTimer()}
          text={<FontAwesome name="play"/>}
          format="round"
        />
      )
    }

    return (
      <div>
        <Button
          className="btn-primary btn-sm"
          onClick={() => isPaused ? this.resumeTimer() : this.pauseTimer()}
          text={<FontAwesome name={isPaused ? "play" : "pause"}/>}
          format="round"
        />
        <Button
          className="btn-success btn-sm"
          onClick={() => this.storeTask()}
          text={<FontAwesome name="check"/>}
          format="round"
        />
      </div>
    )
  };

  render() {
    const { description } = this.state;

    return (
      <div id="time-tracker">
        <div className="time">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-9">
                <input type="text" name="description" className="form-control" value={description} onChange={e => this.onChange(e)} placeholder="Enter a description for the task"/>
              </div>
              <div className="col-lg-3">
                {this.showButtons()}
              </div>
            </div>
          </div>
          <h2>{this.showTime()}</h2>
        </div>
      </div>
    )
  }
}

export default Time;