export const openWeatherConfig = {
    baseUrl: "https://api.openweathermap.org/data/2.5",
    units: "metric",
    iconUrl: (code: string, size: string = "2x") => `https://openweathermap.org/img/wn/${code}@${size}.png`,
};
