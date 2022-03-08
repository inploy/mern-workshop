import React from "react";

const Load = (props) => {
  const { loading, children } = props;

  if (loading) return <div>loading</div>;

  return children;
};

export default Load;
