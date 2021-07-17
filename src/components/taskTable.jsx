import moment from "moment";
import React, { Component } from "react";
import Table from "./common/table";

class TaskTable extends Component {
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
      label: "",
      content: (todo) => (
        <i
          style={{ color: "green" }}
          title="mark as done"
          onClick={this.props.handleMoveToDone(todo)}
          className="fa fa-check-circle icon-class"
        ></i>
      ),
    },
    {
      label: "",
      content: (todo) => (
        <i
          style={{ color: "hotpink" }}
          title="edit task"
          className="fa fa-edit icon-class"
          onClick={this.props.handleEdit(todo)}
        ></i>
      ),
    },
    {
      label: "",
      content: (todo) => (
        <i
          style={{ color: "red" }}
          title="remove task"
          className="fa fa-times-circle icon-class"
          onClick={this.props.handleRemove(todo)}
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

export default TaskTable;
