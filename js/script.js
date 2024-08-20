let body = document.querySelector('body');
let video = document.getElementById('vid');
let currentWeather = null

let timeFrames = [
    {
        time: 'darkness',
        start: 0,
        end: 6,
        image: {
            default: './media/darkness.jpg',
            thunderstorm: './media/darkness_rain.mp4',
            rain: './media/darkness_rain.mp4'
        }
    },
    {
        time: 'morning',
        start: 6,
        end: 10,
        image: {
            default: './media/morning.jpg',
            thunderstorm: './media/morning_rain.mp4',
            rain: './media/morning_rain.mp4'
        }
    },
    {
        time: 'day',
        start: 11,
        end: 18,
        image: {
            default: './media/day.jpg',
            thunderstorm: './media/day_rain.mp4',
            rain: './media/day_rain.mp4'
        }
    },
    {
        time: 'evening', start: 18, end: 21,
        image: {
            default: './media/evening.jpg',
            thunderstorm: './media/evening_rain.mp4',
            rain: './media/evening_rain.mp4'
        }
    },
    {
        time: 'night', start: 21, end: 24, image: {
            default: './media/night.jpg',
            thunderstorm: './media/night_rain.mp4',
            rain: './media/night_rain.mp4'
        }
    }
];

updateBackgroundState();

setInterval(updateBackground, 10 * 1000);
setInterval(updateWeather, 10 * 60 * 1000);

function updateBackground() {
    let hours = new Date().getHours();
    let frame = timeFrames.find(frame => hours >= frame.start && hours < frame.end);
    let condition = currentWeather?.weather[0]?.main;
    let background = frame.image[condition] ?? frame.image.default;
    setBackground(background);
}

function setBackground(url) {
    if (isVideoFile(url)) {
        setVideoBackground(url)
        video.style.display = 'block'
    } else {
        setImageBackground(url)
        video.pause();
        video.style.display = 'none'
    }
}

function setImageBackground(url) {
    body.style.backgroundImage = `url(${url})`;
}

function setVideoBackground(url) {
    if (!video.src.includes(url.substring(1))) {
        video.src = url;
        video.load();
        video.play();
    }
    if (video.paused) {
        video.play();
    }
}

async function updateWeather() {
    if (weatherToggle) {
        currentWeather = await getWeather(latitude, longitude, apiKey)
    } else {
        currentWeather = null
    }
}

async function getWeather(lat, lon, apiKey) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    if (response.status !== 200) {
        showError("There was an error while fetching the weather data. Please verify the weather API information")
        return;
    }
    cleanError();
    return await response.json();
}

function isVideoFile(filePath) {
    return filePath.toLowerCase().endsWith('.mp4');
}

function logToPage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    document.getElementById('logs').appendChild(p);
}

function showError(message) {
    const logElement = document.getElementById('errors');

    if (logElement.firstChild) {
        logElement.firstChild.textContent = message;
    } else {
        const p = document.createElement('span');
        p.textContent = message;
        logElement.appendChild(p);
    }
}

function cleanError() {
    const logElement = document.getElementById('errors');
    logElement.innerHTML = ''
}

function updateBackgroundState() {
    updateWeather().then(updateBackground)
}

function updateTimeFrames(time, weather, backgroundPath) {
    let timeFrame = timeFrames.find(frame => frame.time === time);
    timeFrame.image[weather] = backgroundPath;
}