import dayjs from "dayjs";
import { ICoordinates, IWeatherHour, IWeatherDay } from "@/interfaces";
import { getWeatherCodeById, getAverage } from "@/helpers";
import { WeatherCode } from "@/enums";
import { temperatureUnit } from "@/types";

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

const DAY_START_HOUR = 6;
const NIGHT_START_HOUR = 20;

export default function getWeatherForecastForCoordinates(
  coordinates: ICoordinates,
  options: { temperatureUnit: temperatureUnit },
): Promise<{ hourly: IWeatherHour[]; daily: IWeatherDay[] }> {
  return new Promise((resolve, reject) => {
    const searchParams = new URLSearchParams({
      latitude: coordinates.latitude.toString(),
      longitude: coordinates.longitude.toString(),
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "precipitation_probability",
        "rain",
        "snowfall",
        "snow_depth",
        "weather_code",
        "wind_speed_10m",
        "wind_direction_10m",
      ].join(","),
      daily: "weather_code",
      forecast_days: "14",
      temperature_unit: options.temperatureUnit,
    });

    const url = new URL(
      "https://api.open-meteo.com/v1/forecast?" + searchParams,
    );

    fetch(url)
      .then((response) => response.json())
      .then((data: IResponse) => {
        const _hourly: IWeatherHour[] = data.hourly.time.map((time, index) => ({
          date: dayjs(time),
          precipitationProbability:
            data.hourly.precipitation_probability[index],
          rain: data.hourly.rain[index],
          humidity: data.hourly.relative_humidity_2m[index],
          snowDepth: data.hourly.snow_depth[index],
          snowfall: data.hourly.snowfall[index],
          temperature: data.hourly.temperature_2m[index],
          weatherCode: getWeatherCodeById(data.hourly.weather_code[index]),
          windSpeed: data.hourly.wind_speed_10m[index],
          windDirection: data.hourly.wind_direction_10m[index],
        }));

        function getDailyWeatherCode(day: string) {
          const _index = data.daily.time.indexOf(day);
          return data.daily.weather_code[_index];
        }

        const _groupedDaily = Object.entries(
          Object.groupBy(_hourly, ({ date }) =>
            date.format("YYYY-MM-DDT00:00:00.000Z"),
          ),
        );

        const _daily: IWeatherDay[] = _groupedDaily.map(
          ([date, hourly], index) => {
            if (!hourly) {
              throw new Error("Hourly is undefined");
            }

            const weatherDay = hourly.filter(
              (w) =>
                w.date.hour() >= DAY_START_HOUR &&
                w.date.hour() < NIGHT_START_HOUR,
            );

            const weatherNight = [
              ...(_groupedDaily[index - 1]?.[1]?.filter(
                (w) => w.date.hour() >= NIGHT_START_HOUR,
              ) || []),
              ...(_groupedDaily[index][1]?.filter(
                (w) => w.date.hour() < DAY_START_HOUR,
              ) || []),
            ];

            return {
              date: dayjs(date),
              precipitationProbability: +getAverage(
                hourly.map((w) => w.precipitationProbability),
              ).toFixed(),
              rain: +getAverage(hourly.map((w) => w.rain)).toFixed(),
              humidity: +getAverage(hourly.map((w) => w.humidity)).toFixed(),
              snowDepth: +getAverage(hourly.map((w) => w.snowDepth)).toFixed(),
              snowfall: +getAverage(hourly.map((w) => w.snowfall)).toFixed(),
              temperatureDay: +getAverage(
                weatherDay.map((w) => w.temperature),
              ).toFixed(),
              temperatureNight: +getAverage(
                weatherNight.map((w) => w.temperature),
              ).toFixed(),
              weatherCode: getDailyWeatherCode(
                dayjs(date).format("YYYY-MM-DD"),
              ),
              windSpeed: +getAverage(hourly.map((w) => w.windSpeed)).toFixed(),
              windDirection: hourly[0].windDirection,
            };
          },
        );

        resolve({ hourly: _hourly, daily: _daily });
      })
      .catch(reject);
  });
}
