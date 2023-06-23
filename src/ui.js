import { callCurrentAPI, callForecastAPI } from "./api"
import { getContentContainer } from "."

function generateUI(locations) {
    locations.forEach(element => {
        createCard(element)
    })
}

async function createCard(location) {
    const contentContainer = getContentContainer()
    const current = await callCurrentAPI(location)
    const forecast = await callForecastAPI(location)
    
    try {
        const cardContainer = document.createElement('div')
        cardContainer.className = 'card-container'   
        
        cardContainer.innerHTML = `       
        <h1 class="location">${location}</h1>
        <div class="temp-icon-wrapper">
            <h1 class="temperature">${current.current.temp_c}°C</h1>
            <img src=${current.current.condition.icon} class="icon">
        </div>      
        <div class="forecast-wrapper-empty">
            
        </div>   
        <h3 class="humidity">${current.current.humidity}% Humidity</h3>
        <h3 class="feels-like">Feels like: ${current.current.feelslike_c}°C</h3>
        <h3 class="UV-index">UV index: ${current.current.uv}</h3>
        <h3 class="rain-chance">Chance of rain: ${forecast.forecast.forecastday[0].day.daily_will_it_rain}%</h3>
        <button class="delete-btn">Delete</button>`;
    
        contentContainer.appendChild(cardContainer);  

    } catch (error) {
        console.log(error)
    }

    const forecastWrapper = document.querySelector('.forecast-wrapper-empty')
    populateForecast(forecastWrapper, forecast)
}

function populateForecast(wrapper, forecast) {
    const forecastHour = forecast.forecast.forecastday[0].hour
    
    const date = new Date;
    const hour = date.getHours();

    const nowWrapper = document.createElement('div')
    nowWrapper.classList.add('hourly-wrapper')
    nowWrapper.innerHTML = `
        <div class="time">Now</div>
        <img class="hourly-img" src=${forecastHour[hour].condition.icon}>
        <div class="hourly-temp">${forecastHour[hour].temp_c}°C</div>
    `;

    wrapper.appendChild(nowWrapper)
    wrapper.setAttribute('class', 'forecast-wrapper')

    for (let i = hour+1; i < 24; i++) {
        const hourWrapper = document.createElement('div')
        hourWrapper.classList.add('hourly-wrapper')

        hourWrapper.innerHTML = `
            <div class="time">${i}</div>
            <img class="hourly-img" src=${forecastHour[i].condition.icon}>
            <div class="hourly-temp">${forecastHour[i].temp_c}°C</div>
        `
        wrapper.appendChild(hourWrapper)
    }   

}

export { generateUI }