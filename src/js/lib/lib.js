/* eslint-disable */
// Kelvin -> Celsius 온도 변환기
export const convertToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

// element 만들기
export const handleCreateElement = (tag, temperature) => {
  const container = document.createElement("div");
  const createdTag = document.createElement(tag);

  createdTag.textContent = `현재 날씨는 ${temperature}°C 입니다.`;

  container.appendChild(createdTag);
  return container;
};
