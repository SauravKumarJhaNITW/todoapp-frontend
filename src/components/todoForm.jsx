import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { modifyTask } from "../services/todoService";

class TodoForm extends Form {
  state = {
    data: {
      task: "",
    },
    errors: {},
  };

  schema = {
    task: Joi.string().required().label("Task"),
  };

  componentDidMount() {
    const data = { ...this.state.data };
    data.task = this.props.match.params.task;
    this.setState({ data });
  }

  doSubmit = async () => {
    try {
      await modifyTask(this.state.data.task, this.props.match.params._id);
      window.location = "/todoList";
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
    return (
      <div
        className="text-center mx-auto"
        style={{
          marginTop: "10vh",
          padding: "2%",
          backgroundColor: "lightgray",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <h3>Modify Task</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("task", "Task")}
          {this.renderButton("Modify")}
        </form>
      </div>
    );
  }
}

export default TodoForm;
