import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService.js";

class Header extends Component {
  render() {
    const isAuthenticated = AuthService.isAuthenticated();

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href="/" className="navbar-brand">
              In Minutes
            </a>
          </div>

          <ul className="navbar-nav">
            {isAuthenticated && (
              <li>
                <Link className="nav-link" to="/welcome/thecrazzyrahul">
                  Home
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link className="nav-link" to="/todos">
                  Todos
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isAuthenticated && (
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={AuthService.logout}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
