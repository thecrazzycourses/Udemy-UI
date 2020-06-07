import React, { Component } from "react";
import AuthService from "../auth/AuthService";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "thecrazzyrahul",
      password: "",
      hasLoginFailed: false,
      showLoginSuccessMessage: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  // Will only work if form input name is same as state
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  login() {
    if (
      this.state.username === "thecrazzyrahul" &&
      this.state.password === "dummy"
    ) {
      AuthService.registerSuccessfulLogin(this.state.username);
      this.props.history.push(`/welcome/${this.state.username}`);
    } else {
      this.setState({
        hasLoginFailed: true,
        showLoginSuccessMessage: false,
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
        <ShowLoginSuccess
          showSuccessMessage={this.state.showLoginSuccessMessage}
        /> */}
          {/* Second Way of doing it*/}
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials</div>
          )}
          {this.state.showLoginSuccessMessage && <div>Login Successful</div>}
          Username:{" "}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-success" onClick={this.login}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

/* function ShowInvalidCredentials(props) {
  if (props.hasLoginFailed) {
    return <div>Invalid Credentials</div>;
  }

  return null;
}

function ShowLoginSuccess(props) {
  if (props.showSuccessMessage) {
    return <div>Login Successful</div>;
  }

  return null;
} */

export default Login;
