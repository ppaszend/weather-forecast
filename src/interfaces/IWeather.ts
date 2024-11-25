import { Dayjs } from "dayjs";
import { WeatherCode } from "@/enums";

interface IWeather {
  date: Dayjs;
  precipitationProbability: number;
  rain: number;
  humidity: number;
  snowDepth: number;
  snowfall: number;
  temperature: number;
  weatherCode?: WeatherCode;
  windSpeed: number;
  windDirection: number;
}

export default IWeather;
