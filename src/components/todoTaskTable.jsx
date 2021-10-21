import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class TodoTaskTable extends Component {
  columns = [
    { path: "task", label: "Task" },
    {
      path: "dateCreated",
      label: "Date Created",
      content: (todo) => {
        return moment(moment.utc(todo.dateCreated).toDate())
          .local()
          .format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      path: "dueDate",
      label: "Due Date",
      content: (todo) => {
        return moment(moment.utc(todo.dueDate).toDate())
          .local()
          .format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      label: "",
      key: "done icon",
      content: (todo) => (
        <i
          style={{ color: "green", cursor: "pointer" }}
          title="mark as done"
          onClick={() => this.props.onMoveToDone(todo)}
          className="fa fa-check-circle icon-class"
        ></i>
      ),
    },
    {
      label: "",
      key: "edit icon",
      content: (todo) => (
        <Link to={`/todoList/${todo._id}/${todo.task}`}>
          <i
            style={{ color: "hotpink", cursor: "pointer" }}
            title="edit task"
            className="fa fa-edit icon-class"
          ></i>
        </Link>
      ),
    },
    {
      key: "remove icon",
      content: (todo) => (
        <i
          style={{ color: "red", cursor: "pointer" }}
          title="remove task"
          className="fa fa-times-circle icon-class"
          onClick={() => this.props.onRemove(todo)}
        ></i>
      ),
    },
  ];
  render() {
    const { sortColumn, onSort, todos } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        items={todos}
      />
    );
  }
}

export default TodoTaskTable;
