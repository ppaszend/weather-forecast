import IWeather from "./weather";

interface IWeatherDay extends IWeather {
  temperatureDay: number;
  temperatureNight: number;
}

export default IWeatherDay;
