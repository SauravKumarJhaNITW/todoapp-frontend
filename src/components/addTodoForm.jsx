import React from "react";
import Joi from "joi-browser";
import moment from "moment";
import Form from "./common/form";
import { addTask } from "../services/todoService";

class AddTodoForm extends Form {
  state = {
    data: {
      task: "",
      dueDate: "",
    },
    errors: {},
  };

  schema = {
    task: Joi.string().required().label("Task"),
    dueDate: Joi.required().label("Due Date"), //datetime-local check is to be included
  };

  doSubmit = async () => {
    try {
      await addTask(this.state.data.task, this.state.data.dueDate);
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

  today = () => {
    return moment().format("YYYY-MM-DDThh:mm");
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
        <h3>Add Task</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("task", "Task")}
          {this.renderDateInput(
            "dueDate",
            "Due Date",
            "datetime-local",
            this.today()
          )}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default AddTodoForm;
