import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Registry.css";
import RegistryItem from "../../Components/RegistryItem/RegistryItem";

function Registry() {
  const [registryData, setRegistryData] = useState([]);

  const getRegistryData = () => {
    axios({
      method: "GET",
      url: `http://localhost:8000`,
      headers: { "content-type": "application/json" },
      data: {},
    })
      .then((result) => {
        setRegistryData(result.data);
      })
      .catch((error) => {
        console.log("res", error);
      });
  };

  useState(() => {
    getRegistryData();
  }, []);

  return (
    <div className="container">
      <div className="list-container">
        {registryData &&
          registryData.map((element) => {
            return (
              <RegistryItem
                ID={element.ID}
                age={element.age}
                nationality={element.nationality}
                name={element.name}
                surname={element.surname}
                key={element.ID}
              ></RegistryItem>
            );
          })}
      </div>
    </div>
  );
}

export default Registry;
