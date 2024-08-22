let latitude = null
let longitude = null
let apiKey = null
let weatherToggle = true
let rainToggle = false

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
            updateBackgroundState();
            break;
        case "enableRainToggle":
            rainToggle = val;
            if (rainToggle === true) {
                clearError()
            }
            updateBackgroundState();
            break;
        case "morningBackgroundSelect":
            updateTimeFrames('morning', 'default', assemblePath(val));
            updateBackgroundState()
            break;
        case "dayBackgroundSelect":
            updateTimeFrames('day', 'default', assemblePath(val));
            updateBackgroundState()
            break;
        case "eveningBackgroundSelect":
            updateTimeFrames('evening', 'default', assemblePath(val));
            updateBackgroundState()
            break;
        case "nightBackgroundSelect":
            updateTimeFrames('night', 'default', assemblePath(val));
            updateBackgroundState()
            break;
        case "darknessBackgroundSelect":
            updateTimeFrames('darkness', 'default', assemblePath(val));
            updateBackgroundState()
            break;
        case "morningRainBackgroundSelect":
            updateTimeFrames('morning', 'rain', assemblePath(val));
            updateTimeFrames('morning', 'thunderstorm', assemblePath(val));
            updateBackgroundState()
            break;
        case "dayRainBackgroundSelect":
            updateTimeFrames('day', 'rain', assemblePath(val));
            updateTimeFrames('day', 'thunderstorm', assemblePath(val));
            updateBackgroundState()
            break;
        case "eveningRainBackgroundSelect":
            updateTimeFrames('evening', 'rain', assemblePath(val));
            updateTimeFrames('evening', 'thunderstorm', assemblePath(val));
            updateBackgroundState()
            break;
        case "nightRainBackgroundSelect":
            updateTimeFrames('night', 'rain', assemblePath(val));
            updateTimeFrames('night', 'thunderstorm', assemblePath(val));
            updateBackgroundState()
            break;
        case "darknessRainBackgroundSelect":
            updateTimeFrames('darkness', 'rain', assemblePath(val));
            updateTimeFrames('darkness', 'thunderstorm', assemblePath(val));
            updateBackgroundState()
            break;
    }
}

function assemblePath(val) {
    return './' + val.replace('\\', '/');
}