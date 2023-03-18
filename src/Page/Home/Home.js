import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    fname: "Test",
    lname: "TSET",
    email: "niyaaz@gmail.com",
    message: "Awe Awe",
    mailSent: false,
    error: null,
  });

  const handleFormInputChange = (e, name) => {
    e.preventDefault();
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    console.log("submit clicked");

    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8000/server.php`,
      headers: { "content-type": "application/json" },
      data: formData,
    })
      .then((result) => {
        alert("success");
        console.log("res", result);
      })
      .catch((error) => {
        alert("failed");
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
          <input
            type="submit"
            onClick={(e) => handleFormSubmit(e)}
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Home;
