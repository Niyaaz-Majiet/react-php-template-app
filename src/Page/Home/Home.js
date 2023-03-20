import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    nationality: "",
  });

  const handleFormInputChange = (e, name) => {
    e.preventDefault();
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8000`,
      headers: { "content-type": "application/json" },
      data: formData,
    })
      .then((res) => {
        navigate("/registry");
      })
      .catch((error) => {
        console.log("res", error);
      });
  };

  return (
    <div className="container">
      <form className="form-container">
        <div className="input-container">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Your name ..."
            value={formData.name}
            onChange={(e) => {
              handleFormInputChange(e, "name");
            }}
          />
        </div>

        <div className="input-container">
          <label>Surname</label>
          <input
            type="text"
            placeholder="Your surname ..."
            value={formData.surname}
            onChange={(e) => {
              handleFormInputChange(e, "surname");
            }}
          />
        </div>

        <div className="input-container">
          <label>age</label>
          <input
            type="number"
            placeholder="Your age ..."
            value={formData.age}
            onChange={(e) => {
              handleFormInputChange(e, "age");
            }}
          />
        </div>

        <div className="input-container">
          <label>Nationality</label>
          <input
            type="text"
            placeholder="Your nationality ..."
            value={formData.nationality}
            onChange={(e) => {
              handleFormInputChange(e, "nationality");
            }}
          />
        </div>

        <input
          type="submit"
          onClick={(e) => handleFormSubmit(e)}
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Home;
