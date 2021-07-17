import React from "react";

const ClearAll = (props) => {
  return (
    <div className="text-center my-3">
      <button onClick={props.onClearAll} className="btn btn-danger">
        Clear All
      </button>
    </div>
  );
};

export default ClearAll;
