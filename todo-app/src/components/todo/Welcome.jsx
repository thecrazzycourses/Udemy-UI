import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <>
        <h1>Welcome</h1>
        <div className="container">
          Welcome {this.props.match.params.userName}, You can manage your Todos{" "}
          <Link to="/todos">here</Link>
        </div>
      </>
    );
  }
}

export default Welcome;
