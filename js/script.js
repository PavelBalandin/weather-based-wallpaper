const body = document.querySelector('body');
const video = document.getElementById('vid');

let weatherData = null;

updateBackgroundState();
setInterval(updateBackground, 10 * 1000);
setInterval(fetchAndUpdateWeather, 10 * 60 * 1000);

async function updateBackgroundState() {
    await fetchAndUpdateWeather();
    updateBackground();
}

function updateTimeFrames(time, condition, backgroundPath) {
    const timeFrame = timeFrames.find(frame => frame.time === time);
    if (timeFrame) {
        timeFrame.image[condition] = backgroundPath;
    }
}

function updateBackground() {
    const currentHour = new Date().getHours();
    const frame = timeFrames.find(frame => currentHour >= frame.start && currentHour < frame.end);
    const condition = extractWeather(weatherData);
    const background = frame?.image[condition] || frame?.image.default;

    setBackground(background);
}

function setBackground(url) {
    if (isVideoFile(url)) {
        setVideoBackground(url);
        video.style.display = 'block';
    } else {
        setImageBackground(url);
        video.style.display = 'none';
    }
}

function setImageBackground(url) {
    body.style.backgroundImage = `url(${url})`;
    video.pause();
}

function setVideoBackground(url) {
    if (!video.src.includes(url.substring(1))) {
        video.src = url;
        video.load();
    }
    if (video.paused) {
        video.play();
    }
}

async function fetchAndUpdateWeather() {
    if (weatherToggle) {
        weatherData = await fetchWeather(latitude, longitude, apiKey);
    } else {
        weatherData = null;
    }
}

async function fetchWeather(lat, lon, apiKey) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    if (response.status === 200) {
        clearError();
        return await response.json();
    } else {
        displayError("There was an error while fetching the weather data. Please verify the weather API information")
    }
}

function extractWeather(weather) {
    if (defaultWeather !== 'none') {
        return defaultWeather
    }
    return weather?.weather[0]?.main;
}

function isVideoFile(filePath) {
    return filePath.toLowerCase().endsWith('.mp4');
}

function logToPage(message) {
    const logElement = document.getElementById('logs');
    const logMessage = document.createElement('p');
    logMessage.textContent = message;
    logElement.appendChild(logMessage);
}

function displayError(message) {
    const errorElement = document.querySelector('#errors>span');
    errorElement.textContent = message;
    errorElement.style.display = 'inline-block';
}

function clearError() {
    const errorElement = document.querySelector('#errors>span');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}