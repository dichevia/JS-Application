function attachEvents() {
    const locationRequest = document.getElementById("location");
    const getWeatherBtn = document.getElementById("submit");
    const forecast = document.getElementById("forecast");
    const currentWeather = document.getElementById("current");
    const upcomingWeather = document.getElementById("upcoming");

    let divWrapper = createElmentDOM("div", "forecasts", "");
    let forecastInfo = createElmentDOM("div", "forecast-info", "");

    getWeatherBtn.addEventListener("click", getWeather);

    const conditionSymbols = {
        "Sunny": "☀",
        "Partly sunny": "⛅",
        "Overcast": "☁",
        "Rain": "☂",
        "Degrees": "°"
    }

    function createElmentDOM(type, className, text) {
        let element = document.createElement(type);
        element.classList.add(className);
        element.textContent = `${text}`;

        return element;
    }

    function fetchWeather(URI) {
        let baseURL = "https://judgetests.firebaseio.com/";

        return fetch(baseURL + `${URI}` + ".json")
            .then(response => response.json())
    }

    function getWeather() {
        fetchWeather("locations")
            .then(data => {
                city = data.find(c => c.name === locationRequest.value)

                fetchWeather(`forecast/today/${city["code"]}`)
                    .then(data => getCurrentWeather(data))

                fetchWeather(`forecast/upcoming/${city["code"]}`)
                    .then(data => getUpcomingWeather(data))
            })
            .catch(error => {
                console.log(error);
                forecast.style.display = "block";
                divWrapper.innerHTML = "";
                forecastInfo.innerHTML = "";

                let errorMessage = createElmentDOM("div", "label", "ERROR");
                forecast.appendChild(errorMessage);
            })
    }

    function getCurrentWeather(data) {
        forecast.style.display = "block";
        divWrapper.innerHTML = "";

        let symbolSpan = createElmentDOM("span", "condition", `${conditionSymbols[data.forecast.condition]}`);
        symbolSpan.classList.add("symbol");

        let dataSpan = createElmentDOM("span", "condition", "");
        let nameSpan = createElmentDOM("span", "forecast-data", `${data.name}`);
        let temperaturesSpan = createElmentDOM("span", "forecast-data", `${data.forecast.low}${conditionSymbols.Degrees}/${data.forecast.high}${conditionSymbols.Degrees}`);
        let textTempSpan = createElmentDOM("span", "forecast-data", `${data.forecast.condition}`);

        dataSpan.append(nameSpan, temperaturesSpan, textTempSpan);
        divWrapper.append(symbolSpan, dataSpan);
        currentWeather.appendChild(divWrapper);
    }

    function getUpcomingWeather(data) {
        forecastInfo.innerHTML = "";

        for (const conditions of data.forecast) {
            let upcomingSpan = createElmentDOM("span", "upcoming", "")

            let symbolSpan = createElmentDOM("span", "symbol", `${conditionSymbols[conditions.condition]}`);
            let temperaturesSpan = createElmentDOM("span", "forecast-data", `${conditions.low}${conditionSymbols.Degrees}/${conditions.high}${conditionSymbols.Degrees}`);
            let textTempSpan = createElmentDOM("span", "forecast-data", `${conditions.condition}`);

            upcomingSpan.append(symbolSpan, temperaturesSpan, textTempSpan);
            forecastInfo.append(upcomingSpan);
        }

        upcomingWeather.append(forecastInfo);
    }
}

attachEvents();