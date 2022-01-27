/* eslint-disable */
import axios from "axios";
import { convertToCelsius, handleCreateElement } from "../lib/lib";
const content = document.querySelector(".content5");

const getGeoInfo = navigator.geolocation.watchPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  axios({
    method: "get",
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`,
    responseType: "json",
  }).then((json) => {
    content.appendChild(
      handleCreateElement("p", convertToCelsius(json.data.main.temp))
    );
  });

  navigator.geolocation.clearWatch(getGeoInfo);
});
