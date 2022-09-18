import React, { Component } from "react";
import loading from "./loading.gif";
import _ from "lodash";
import {
  deleteAllDones,
  deleteDone,
  getDoneList,
} from "../services/doneService";
import SearchBox from "./common/searchBox";
import DoneTaskTable from "./doneTaskTable";
import Pagination from "./common/pagination";
import ClearAll from "./clearAll";
import { paginate } from "../utils/paginate";

class DoneList extends Component {
  state = {
    dones: [],
    searchQuery: "",
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "task", order: "asc" },
    error: {},
  };

  async componentDidMount() {
    const dones = await getDoneList();
    this.setState({ dones, flag: true });
  }

  handleSearch = (searchQuery) => {
    this.setState({
      searchQuery,
      currentPage: 1,
    });
  };

  handleRemove = async (todo) => {
    await deleteDone(todo._id);
    window.location.reload();
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      await deleteAllDones();
      window.location.reload();
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    let filtered = this.state.dones;

    if (this.state.searchQuery) {
      filtered = this.state.dones.filter((m) =>
        m.task.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const dones = paginate(sorted, this.state.currentPage, this.state.pageSize);
    if (!this.state.flag)
      return (
        <div className="container">
          <img
            style={{ marginLeft: "10vw", marginRight: "10vw" }}
            src={loading}
            alt="Loading..."
          ></img>
        </div>
      );
    return (
      <React.Fragment>
        <h2 style={{ color: "green" }} className="text-center">
          Done List
        </h2>
        {this.state.dones.length === 0 && (
          <div className="text-center">
            <h3>Nothing to show..Mark some item as done in todo list.</h3>
          </div>
        )}
        {this.state.dones.length > 0 && (
          <React.Fragment>
            <SearchBox
              value={this.state.searchQuery}
              onSearch={(searchQuery) => this.handleSearch(searchQuery)}
            />
            <DoneTaskTable
              dones={dones}
              sortColumn={this.state.sortColumn}
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

export default DoneList;
