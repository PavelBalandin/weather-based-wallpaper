// Settings
let latitude = 0
let longitude = 0
let apiKey = ''

let body = document.querySelector('body');
let video = document.getElementById('vid');

let currentWeather = null

let timeFrames = [
    {
        time: 'darkness',
        start: 0,
        end: 6,
        image: {
            default: './images/darkness.jpg',
            Thunderstorm: './video/darkness_rain.mp4',
            Rain: './video/darkness_rain.mp4'
        }
    },
    {
        time: 'morning',
        start: 6,
        end: 10,
        image: {
            default: './images/morning.jpg',
            Thunderstorm: './video/morning_rain.mp4',
            Rain: './video/morning_rain.mp4'
        }
    },
    {
        time: 'day',
        start: 11,
        end: 18,
        image: {
            default: './images/day.jpg',
            Thunderstorm: './video/day_rain.mp4',
            Rain: './video/day_rain.mp4'
        }
    },
    {
        time: 'evening', start: 18, end: 21,
        image: {
            default: './images/evening.jpg',
            Thunderstorm: './video/evening_rain.mp4',
            Rain: './video/evening_rain.mp4'
        }
    },
    {
        time: 'night', start: 22, end: 24, image: {
            default: './images/night.jpg',
            Thunderstorm: './video/night_rain.mp4',
            Rain: './video/night_rain.mp4'
        }
    }
];

updateWeather().then(r => updateBackground());

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
    } else {
        video.pause();
        setImageBackground(url)
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
}

async function updateWeather() {
    currentWeather = await getWeather(latitude, longitude, apiKey)
}

async function getWeather(lat, lon, apiKey) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    return await response.json();
}

function isVideoFile(filePath) {
    return filePath.toLowerCase().endsWith('.mp4');
}

function livelyPropertyListener(name, val) {
    switch (name) {
        case "apiKey":
            apiKey = val;
            break;
        case "latitude":
            latitude = val;
            break;
        case "longitude":
            longitude = val;
            break;
    }
}

function logToPage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    document.getElementById('logs').appendChild(p);
}