/* eslint-disable */
import { convertToCelsius, handleCreateElement } from "../lib/lib";
const content = document.querySelector(".content3");

const promiseWeatherApiGetMethod = (latitude, longitude) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

const getGeoInfo = navigator.geolocation.watchPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  promiseWeatherApiGetMethod(latitude, longitude)
    .then((json) =>
      content.appendChild(
        handleCreateElement("p", convertToCelsius(json.main.temp))
      )
    )
    .catch((error) => console.error(error));

  navigator.geolocation.clearWatch(getGeoInfo);
});

// ex) 유저 아이디 값을 가져온다.
// 그 아이디에 해당하는 정보를 가져온다.
// 그 정보 중에 음료에 관한 정보가 있는지 확인한다.
// 음료 디비에 가서 비슷한 카테고리를 가져온다.
// 비슷한 카테고리 전송

// promise는 마이크로 테스트 큐에 전송 (태스크 큐보다 우선순위가 높다.)
