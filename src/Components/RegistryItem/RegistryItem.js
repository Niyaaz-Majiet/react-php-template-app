import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegistryItem.css";

const RegistryItem = ({ ID, name, surname, age, nationality }) => {
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate("/", {
      state: {
        ID,
        name,
        surname,
        age,
        nationality,
      },
    });
  };

  return (
    <div className="container-item" onClick={() => handleItemClick()}>
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
