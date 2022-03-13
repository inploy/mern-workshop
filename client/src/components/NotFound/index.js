import React from "react";

const NotFound = () => {
  return (
    <div class="container d-flex aligns-items-center justify-content-center text-center m-5">
      <div class="column">
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>
        <div class="error-details">
          Sorry, an error has occured, Requested page not found!
        </div>
      </div>
    </div>
  );
};

export default NotFound;
