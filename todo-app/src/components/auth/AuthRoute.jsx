import React, { Component } from "react";
import AuthService from "./AuthService";
import { Route, Redirect } from "react-router-dom";

class AuthRoute extends Component {
  render() {
    if (AuthService.isAuthenticated()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthRoute;
