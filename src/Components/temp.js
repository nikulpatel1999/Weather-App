import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";


const Temp = () => {
  const [searchValue, setSearchvalue] = useState("Ahmedabad");
  const [tempInFo, setTempInFo] = useState({});

  const getWeatherInFo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e5ac870bf59bc3372f3728b8d2f959ac`;
      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      };
      setTempInFo(myWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInFo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchvalue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInFo}
          >
            Search
          </button>
        </div>
      </div>

      <Weathercard tempInFo={tempInFo} />
    </>
  );
};

export default Temp;
