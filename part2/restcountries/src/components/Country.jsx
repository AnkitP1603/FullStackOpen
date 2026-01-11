import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY;

function Country({ data }) {
  const lat = data.capitalInfo.latlng[0];
  const lng = data.capitalInfo.latlng[1];
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`,
      )
      .then((res) => {
        setWeather(res.data);
      });
    return () => setWeather(null);
  }, [data]);

  return (
    <div>
      <h2>{data.name.common}</h2>

      <p>Capital: {data.capital[0]}</p>
      <p>Area: {data.area} km²</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(data.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      <img src={data.flags.png} alt={`Flag of ${data.name.common}`} />

      {weather && (
        <div>
          <h3>Weather in {data.capital[0]}</h3>
          <p>Temperature : {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />
          <p>Wind : {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Country;
