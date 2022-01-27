/* eslint-disable */
import "../../scss/test.scss";
import { convertToCelsius, handleCreateElement } from "../lib/lib";

const content = document.querySelector(".content");

// request 요청
const handleAjaxRequest = (latitude, longitude) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`;
  const xhr = new XMLHttpRequest();
  try {
    xhr.open("GET", URL, true); // 설정하고
    xhr.responseType = "json";
    xhr.send(); // 보낸다

    xhr.onload = () => {
      // 왜 이건 가능하지..?
      const responseOk = xhr.response;
      // console.log(responseOk);
      return content.appendChild(
        handleCreateElement("p", convertToCelsius(responseOk.main.temp))
      );
    };
    xhr.statusText = "OK";
  } catch (error) {
    xhr.onerror = () => {
      throw Error(`Ajax 요청 불가! ${error}`);
    };
  }
};

// 위치값을 가져와 출력
const getGeoInfo = navigator.geolocation.watchPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  handleAjaxRequest(latitude, longitude);

  navigator.geolocation.clearWatch(getGeoInfo);
});
