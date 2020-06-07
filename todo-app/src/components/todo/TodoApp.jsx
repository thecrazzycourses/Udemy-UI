import React, { Component } from "react";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./Welcome";
import Error from "./Error";
import Todos from "./Todos";
import Header from "./Header";
import Footer from "./Footer";
import Logout from "./Logout";
import AuthRoute from "../auth/AuthRoute";
import Todo from "./Todo";

class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router>
          <>
            <Header />
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" exact component={Login} />
              <AuthRoute path="/logout" exact component={Logout} />
              <AuthRoute path="/welcome/:userName" exact component={Welcome} />
              <AuthRoute path="/todos" exact component={Todos} />
              <AuthRoute path="/todo" exact component={Todo} />
              <Route exact component={Error} />
            </Switch>
            <Footer />
          </>
        </Router>
      </div>
    );
  }
}

export default TodoApp;
