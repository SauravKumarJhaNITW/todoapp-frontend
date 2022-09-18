import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCurrentUser, login } from "../services/authService";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      rememberMe: false,
    },
    errors: {}
  };

  refreshId

  schema = {
    username: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    rememberMe: Joi.boolean().label("Remember me"),
  };

  doSubmit = async () => {
    try {
      await login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 404)
      ) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div
        className="text-center mx-auto"
        style={{
          marginTop: "10vh",
          padding: "2%",
          width: "25%",
          minWidth: "200px",
          backgroundColor: "lightgray",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}

          {this.renderInput("rememberMe", "Remember Me", "checkbox")}
          {this.renderButton("Login")}
        </form>
        <h3>OR</h3>
        <Link to="/">forgot password</Link>
      </div>
    );
  }
}

export default LoginForm;
