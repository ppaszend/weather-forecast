import IWeather from "./weather";

interface IWeatherHour extends IWeather {
  temperature: number;
}

export default IWeatherHour;
