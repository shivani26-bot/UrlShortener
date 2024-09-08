import React from "react";

const Error = ({ message }) => {
  return (
    <span className="text-sm text-red-400">
      {/* render the message  */}
      {message}
    </span>
  );
};

export default Error;
