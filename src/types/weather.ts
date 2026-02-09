export interface OpenWeatherInterval {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface OpenWeatherForecastResponse {
  cod: string;
  message: number | string;
  list: OpenWeatherInterval[];
  city: {
    name: string;
    country: string;
  };
}

export interface DayForecast {
  date: string;
  highTemp: number;
  lowTemp: number;
  description: string;
  icon: string;
}

export interface ForecastData {
  city: string;
  country: string;
  days: DayForecast[];
}

export interface ForecastError {
  error: string;
}
