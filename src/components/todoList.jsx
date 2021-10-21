import React, { Component } from "react";
import _ from "lodash";
import {
  deleteAllTodos,
  deleteTodo,
  getTodoList,
} from "../services/todoService";
import AddTodo from "./addTodo";
import SearchBox from "./common/searchBox";
import TodoTaskTable from "./todoTaskTable";
import Pagination from "./common/pagination";
import ClearAll from "./clearAll";
import { paginate } from "../utils/paginate";

class TodoList extends Component {
  state = {
    todos: [],
    searchQuery: "",
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "task", order: "asc" },
  };

  async componentDidMount() {
    const todos = await getTodoList();
    this.setState({ todos, flag: true });
  }

  handleMoveToDone = async (todo) => {
    await deleteTodo(todo._id, true);
    window.location.reload();
  };

  handleSearch = (searchQuery) => {
    this.setState({
      searchQuery,
      currentPage: 1,
    });
  };

  handleRemove = async (todo) => {
    await deleteTodo(todo._id);
    window.location.reload();
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      await deleteAllTodos();
      window.location.reload();
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    let filtered = this.state.todos;

    if (this.state.searchQuery) {
      filtered = this.state.todos.filter((m) =>
        m.task.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const todos = paginate(sorted, this.state.currentPage, this.state.pageSize);
    if (!this.state.flag)
      return (
        <div className="text-center">
          <h3>Loading....</h3>
        </div>
      );
    return (
      <React.Fragment>
        <h2 style={{ color: "blueviolet" }} className="text-center">
          To Do List
        </h2>
        <AddTodo />
        {this.state.todos.length > 0 && (
          <React.Fragment>
            <SearchBox
              value={this.state.searchQuery}
              onSearch={(searchQuery) => this.handleSearch(searchQuery)}
            />
            <TodoTaskTable
              todos={todos}
              sortColumn={this.state.sortColumn}
              onMoveToDone={this.handleMoveToDone}
              onEdit={this.handleEdit}
              onRemove={this.handleRemove}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={filtered.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
            <ClearAll onClearAll={this.handleClearAll} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default TodoList;
