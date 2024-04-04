import React, { useState, useEffect } from "react";


const Weather = () => {

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0283978172435ad5118d34fc15a1afe4`

  const getData = () => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setWeatherData(data))
  }

  // Extracting temperature in Celsius
  const temperatureInKelvin = weatherData?.main.temp;
  const temperatureInCelsius = temperatureInKelvin - 273.15; // Conversion from Kelvin to Celsius

  // Extracting other details about the city
  const cityName = weatherData?.name;
  const country = weatherData?.sys.country;
  const weatherDescription = weatherData?.weather[0].description;
  const humidity = weatherData?.main.humidity;
  const pressure = weatherData?.main.pressure;
  const windSpeed = weatherData?.wind.speed;

  return (
    <div className="main z-20">
      <div className="inner-main">
        <div className="p-2 heading">
          <h1>Weather</h1>
          <button>X</button>
        </div>
        <div className="h w-full bg-white p-5 grid place-content-center">
          <input onChange={(e) => setCity(e.target.value)} />
          <button onClick={getData}>Get data</button>

          Temperature in {cityName}: {temperatureInCelsius.toFixed(2)}°C <br/>
          Weather Description in {cityName}: {weatherDescription} <br/>
          Humidity in {cityName}: {humidity}% <br />
          Pressure in {cityName}: {pressure} hPa <br/>
          Wind Speed in {cityName}: {windSpeed} m/s` <br/>
          Country: {country}
        </div>
      </div>
    </div>
  );
};

export default Weather;
