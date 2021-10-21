import React from "react";
import { Link } from "react-router-dom";

const AddTodo = () => {
  return (
    <div className="text-center my-3">
      <Link to={`/todoList/add`}>
        <button className="btn btn-primary">Add Task</button>
      </Link>
    </div>
  );
};

export default AddTodo;
