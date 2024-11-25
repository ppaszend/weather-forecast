import IWeather from "./IWeather";

interface IWeatherHour extends IWeather {
  temperature: number;
}

export default IWeatherHour;
