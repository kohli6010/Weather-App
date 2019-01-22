let fa = document.querySelector("form .fa");
let input = document.querySelector("form input");
let city = document.querySelector(".city");
let country = document.querySelector(".country");
let temprature = document.querySelector(".temp");
let image = document.querySelector(".image img");
let text = document.querySelector(".text");
let cards = document.querySelectorAll(".card");
let global = this.globe()();

fa.addEventListener("click", function() {
  let inp = input.value;
  apiCall(inp);
});

function apiCall(inp) {
  fetch(`https://api.apixu.com/v1/forecast.json?key=${global}&q=${inp}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(`Not found`);
      } else {
        return response.json();
      }
    })
    .then(function(data) {
      for (let i = 0; i <= 3; i++) {
        cards[i].style.display = `block`;
        if (i == 3) {
          cards[i].style.display = `flex`;
          cards[i].style.flexWrap = `wrap`;
        }
      }
      city.textContent = data.location.name;
      country.textContent = data.location.country;
      temprature.textContent = `${data.current.temp_c}C`;
      let src = data.current.condition.icon.slice(
        2,
        data.current.condition.icon.length + 1
      );
      image.setAttribute(`src`, `http://${src}`);
      text.textContent = data.current.condition.text;
    })
    .catch(function(err) {
      console.log(err);
    });
}
