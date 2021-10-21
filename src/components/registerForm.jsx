import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import { getCurrentUser } from "../services/authService";
import { Redirect } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
      window.location = "/login";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
