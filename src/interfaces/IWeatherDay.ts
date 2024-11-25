import IWeather from "./IWeather";

interface IWeatherDay extends IWeather {
  temperatureDay: number;
  temperatureNight: number;
}

export default IWeatherDay;
