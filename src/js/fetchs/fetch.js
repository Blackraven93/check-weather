/* eslint-disable */
const content = document.querySelector(".content2");

const convertToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

const handleCreateElement = (tag, temperature, text = "") => {
  const container = document.createElement("div");
  const createdTag = document.createElement(tag);

  createdTag.textContent = `현재 날씨는 ${temperature}°C 입니다.`;

  container.appendChild(createdTag);
  return container;
};

const handleFetch = (latitude, longitude) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      content.appendChild(
        handleCreateElement("p", convertToCelsius(json.main.temp))
      );
      // content.textContent = json.main.temp
    });
};

const getGeoInfo = navigator.geolocation.watchPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  handleFetch(latitude, longitude);

  navigator.geolocation.clearWatch(getGeoInfo);
});
