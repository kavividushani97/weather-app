import React, { useState, useEffect } from "react";

const api = {
  key: "8e6c1bb8e1637588929664526bf54151",
  base: "https://api.openweathermap.org/data/2.5/",
};

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(`${api.base}weather?q=Colombo&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      });
  }, []);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const getForecast = () => {
    let query = `${weather.name},${weather.sys.country}`;
    if (!query) {
      console.error("Invalid query:", query);
      return;
    }

    fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data from API");
        }
        return res.json();
      })
      .then((result) => {
        if (result && result.list) {
          setForecast(
            result.list.filter((data) => data.dt_txt.includes("12:00:00"))
          );
          console.log(result);
        } else {
          console.error("Invalid response from API:", result);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <button className="view-more" onClick={getForecast}>
              View More
            </button>
            {forecast.length > 0 && (
              <div className="forecast-container">
                <h3>Weekly Forecast</h3>
                <div className="forecast-item">
                  {forecast.map((forecastData) => (
                    <div key={forecastData.dt}>
                      <div className="date">{forecastData.dt_txt}</div>
                      <div className="temperature">
                        {forecastData.main.temp}°C
                      </div>
                      <div className="description">
                        {forecastData.weather[0].main}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Weather;
