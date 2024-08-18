let latitude = null
let longitude = null
let apiKey = null
let weatherToggle = true

function livelyPropertyListener(name, val) {
    switch (name) {
        case "weatherToggle":
            weatherToggle = val;
            updateBackgroundState();
            break;
        case "apiKey":
            apiKey = val;
            break;
        case "latitude":
            latitude = val;
            break;
        case "longitude":
            longitude = val;
            break;
        case "btnRefreshWeather":
            updateWeather();
            break;
    }
}