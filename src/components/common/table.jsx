import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, items }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody items={items} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
