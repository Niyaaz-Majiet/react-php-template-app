import React from "react";
import "./RegistryItem.css";

const RegistryItem = ({ ID, name, surname, age, nationality }) => {
  return (
    <div className="container-item">
      <label title={name}>
        <input value={name} disabled />
      </label>
      <label title={surname}>
        <input value={surname} disabled />
      </label>
      <label title={age}>
        <input value={age} disabled />
      </label>
      <label title={nationality}>
        <input value={nationality} disabled />
      </label>
    </div>
  );
};

export default RegistryItem;
