import React from "react";

export const Input = (props) => {
  const { placeholder, value, onChange } = props;

  return (
    <input
      className="w-max"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
