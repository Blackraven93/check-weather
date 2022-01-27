/* eslint-disable */
import { convertToCelsius, handleCreateElement } from "../lib/lib";
const content = document.querySelector(".content4");

const asyncFetch = async (latitude, longitude) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`;
  return await (await fetch(URL))
    .json()
    .then((json) =>
      content.appendChild(
        handleCreateElement("p", convertToCelsius(json.main.temp))
      )
    );
};

const getGeoInfo = navigator.geolocation.watchPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  try {
    asyncFetch(latitude, longitude);
  } catch (err) {
    console.error(err);
  }
  navigator.geolocation.clearWatch(getGeoInfo);
});
