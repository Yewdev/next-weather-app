interface IWeather {
  main: string;
  description: string;
  icon: string;
}
interface IMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

export interface IWeatherResponse {
  id: number;
  name: string;
  weather: IWeather;
  main: IMain;
}
export interface IWeatherProps {
  weatherResponse: IWeatherResponse;
}
