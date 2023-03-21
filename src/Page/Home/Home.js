import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = {
    firstName: "",
    surname: "",
    age: null,
    nationality: "",
  };

  if (state) {
    data.ID = state.ID;
    data.firstName = state.name;
    data.surname = state.surname;
    data.age = state.age;
    data.nationality = state.nationality;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios({
      method: "post",
      url: `http://localhost:8000`,
      headers: { "content-type": "application/json" },
      data: data,
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field className="form-container">
          <label>Name</label>
          <input
            className="input-container"
            type="text"
            placeholder="Your Name ..."
            {...register("name", {
              required: true,
              maxLength: 25,
              value: data.firstName,
            })}
          />
        </Form.Field>
        {errors.name && <p>Please check the First Name</p>}
        <Form.Field className="form-container">
          <label>Surname</label>
          <input
            className="input-container"
            type="text"
            placeholder="Your surname ..."
            {...register("surname", {
              required: true,
              maxLength: 25,
              value: data.surname,
            })}
          />
        </Form.Field>
        {errors.surname && <p>Please check the Surname</p>}
        <Form.Field className="form-container">
          <label>Age</label>
          <input
            className="input-container"
            type="number"
            placeholder="Your age ..."
            {...register("age", {
              required: true,
              valueAsNumber: true,
              value: data.age,
            })}
          />
        </Form.Field>
        {errors.age && <p>Please check your Age</p>}
        <Form.Field className="form-container">
          <label>Nationality</label>
          <input
            className="input-container"
            type="text"
            placeholder="Your nationality ..."
            {...register("nationality", {
              required: true,
              maxLength: 50,
              value: data.nationality,
            })}
          />
        </Form.Field>
        {errors.nationality && <p>Please check your Nationality</p>}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
