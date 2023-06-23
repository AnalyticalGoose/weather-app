async function callCurrentAPI(location) {
    try {
        const currentResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=510b7d1e17cd465db5f145615231906&q=${location}`)
        const current = await currentResponse.json()
        return current
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function callForecastAPI(location) {
    try {
        const forecastResponse = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=510b7d1e17cd465db5f145615231906&q=${location}`)
        const forecast = await forecastResponse.json()
        return forecast
    } catch (error) {
        console.log(error)
        return
    }
}

export { callCurrentAPI, callForecastAPI }