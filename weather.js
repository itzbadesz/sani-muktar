const form = document.getElementById('weather-form');
const info = document.getElementById('weather-info');

function cleanInput(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cleanInput(document.getElementById('city').value);
    if (!city) {
        info.textContent = 'Please enter a city name.';
        return;
    }

    info.textContent = 'Loading...';

    try {
        const apiKey = '5a993989043005d480bd364e8a1172d5';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            info.textContent = 'City not found or API error.';
            return;
        }

        const data = await response.json();
        info.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        info.textContent = 'Error fetching weather data.';
        console.error(error);
    }
});