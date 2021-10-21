import moment from "moment";
import React from "react";

const ButtonBox = ({ value, onChange, onAdd, error }) => {
  return (
    <div className="custom-class">
      <div className="input-group mb-3">
        <input
          onChange={(e) => onChange(e.currentTarget.value)}
          type="text"
          className="form-control"
          placeholder="Add Task To do..."
          name="query"
          value={value}
        />
        {/* <input
          onChange={(e) => onChange(e.currentTarget.value)}
          type="datetime-local"
          className="form-control"
          name="dueDate"
          value={value}
          min={today()}
        />{" "} */}
        <div className="input-group-append">
          <button
            className="btn btn-primary btn-sm"
            onClick={onAdd}
            disabled={error}
          >
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );

  function today() {
    console.log(moment());
    return moment().format("YYYY-MM-DDThh:mm");
  }
};

export default ButtonBox;
