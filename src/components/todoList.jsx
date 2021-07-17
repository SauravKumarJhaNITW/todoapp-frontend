import React, { Component } from "react";
import { addTask, deleteAllTodos, getTodoList } from "../services/todoService";
import ButtonBox from "./common/buttonBox";
import SearchBox from "./common/searchBox";
import TaskTable from "./taskTable";
import Pagination from "./common/pagination";
import ClearAll from "./clearAll";

class TodoList extends Component {
  state = {
    todos: [],
    addQuery: "",
    searchQuery: "",
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "task", order: "asc" },
    error: {},
  };

  async componentDidMount() {
    const todos = await getTodoList();
    this.setState({ todos });
  }

  handleChange = (addQuery) => {
    if (addQuery.length === 0) {
      const error = { ...this.state.error };
      error.addQuery = "Task should be non-empty";
      this.setState({ error });
    } else {
      const error = { ...this.state.error };
      error.addQuery = "";
      this.setState({ error });
    }
    this.setState({ addQuery });
  };

  handleMoveToDone = (todo) => {};

  handleSearch = (searchQuery) => {};

  handleEdit = () => {
    console.log("edit method called");
  };

  handleRemove = () => {};

  handleAdd = async () => {
    if (this.state.addQuery.length === 0) {
      const error = { ...this.state.error };
      error.addQuery = "Task should be non-empty";
      this.setState({ error });
    } else {
      await addTask(this.state.addQuery);
      this.setState({ addQuery: "" });
      window.location = "/todoList";
    }
  };

  handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all tasks?"))
      await deleteAllTodos();
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{ color: "blueviolet" }} className="text-center">
          To Do List
        </h1>
        <ButtonBox
          onChange={(addQuery) => this.handleChange(addQuery)}
          onAdd={this.handleAdd}
          value={this.state.addQuery}
          error={this.state.error.addQuery}
        />
        <SearchBox
          value={this.state.searchQuery}
          onSearch={(searchQuery) => this.handleSearch(searchQuery)}
        />
        <TaskTable
          todos={this.state.todos}
          sortColumn={this.state.sortColumn}
          handleMoveToDone={this.handleMoveToDone}
          handleEdit={this.handleEdit}
          handleRemove={this.handleRemove}
        />
        <Pagination />
        <ClearAll onClearAll={this.handleClearAll} />
      </React.Fragment>
    );
  }
}

export default TodoList;
