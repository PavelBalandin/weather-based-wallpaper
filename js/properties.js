let latitude = null
let longitude = null
let apiKey = null

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
        case "btnRefreshWeather":
            updateWeather();
            break;
    }
}