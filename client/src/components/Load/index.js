import React from "react";

const Load = (props) => {
  const { loading, children } = props;

  if (loading)
    return (
      <div class="position-absolute top-50 start-50 text-center">
        <div class="spinner-border my-2" role="status" />
        <div>Loading...</div>
      </div>
    );

  return children;
};

export default Load;
