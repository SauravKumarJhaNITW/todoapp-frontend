import moment from "moment";
import React, { Component } from "react";
import Table from "./common/table";

class DoneTaskTable extends Component {
  columns = [
    { path: "task", label: "Task" },
    {
      path: "dateFinished",
      label: "Date Finished",
      content: (done) => {
        return moment(moment.utc(done.dateFinished).toDate())
          .local()
          .format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      key: "remove icon",
      content: (done) => (
        <i
          style={{ color: "red", cursor: "pointer" }}
          title="remove task"
          className="fa fa-times-circle icon-class"
          onClick={() => this.props.onRemove(done)}
        ></i>
      ),
    },
  ];
  render() {
    const { sortColumn, onSort, dones } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        items={dones}
      />
    );
  }
}

export default DoneTaskTable;
