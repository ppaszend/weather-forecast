import { WeatherCode } from "@/enums";

interface IResponse {
  daily: {
    time: string[];
    weather_code: number[];
  };
  daily_units: {
    time: string;
    weather_code: string;
  };
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    precipitation_probability: string;
    rain: string;
    snowfall: string;
    snow_depth: string;
    weather_code: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
    rain: number[];
    snowfall: number[];
    snow_depth: number[];
    weather_code: WeatherCode[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
  };
}

export default IResponse;
