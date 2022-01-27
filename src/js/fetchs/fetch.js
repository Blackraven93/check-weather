/* eslint-disable */
import { convertToCelsius, handleCreateElement } from "../lib/lib";
const content = document.querySelector(".content2");

const handleFetch = (latitude, longitude) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) =>
      content.appendChild(
        handleCreateElement("p", convertToCelsius(json.main.temp))
      )
    );
};

const getGeoInfo = navigator.geolocation.watchPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  handleFetch(latitude, longitude);

  navigator.geolocation.clearWatch(getGeoInfo);
});
