const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "";

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;
  const url = `https://api.weatherapi.com/v1/current.json?q=${inputVal}&lang=english&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { location, current } = data;
      const iconURL = `https:${current.condition.icon}`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${location.name},${location.country}">
          <span>${location.name}</span>
          <span>${location.country}</span>
        </h2>

        <div class="image-temp">
          <span>${Math.round(current.temp_f)}<sup>°F</sup></span>
          <figure>
            <img class="city-icon" src="${iconURL}" alt="${current.condition.text}">
            <figcaption>${current.condition.text}</figcaption>
          </figure>
        </div>

        <div class="additional-info">
          <p>Region: ${location.region}</p>
          <p>Local Time: ${location.localtime}</p>
          <p>Wind: ${current.wind_mph} mph (${current.wind_dir})</p>
          <p>Pressure: ${current.pressure_in} in</p>
          <p>Precipitation: ${current.precip_in} in</p>
          <p>Humidity: ${current.humidity}%</p>
          <p>Cloud Cover: ${current.cloud}%</p>
          <p>Feels Like: ${Math.round(current.feelslike_f)}<sup>°C</sup></p>
          <p>UV Index: ${current.uv}</p>
        </div>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});
