import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAverage, getWeatherCodeById } from "@/helpers";
import { IWeatherResponse, IWeatherDay, IWeatherHour } from "@/interfaces";
import { temperatureUnit } from "@/types";

const DAY_START_HOUR = 6;
const NIGHT_START_HOUR = 20;

export default function useWeatherData({
  latitude,
  longitude,
  temperatureUnit,
}: {
  latitude: number | undefined;
  longitude: number | undefined;
  temperatureUnit: temperatureUnit;
}) {
  const [weatherData, setWeatherData] = useState<{
    daily: IWeatherDay[];
    hourly: IWeatherHour[];
  }>();

  useEffect(() => {
    setWeatherData(undefined);

    if (!latitude || !longitude) {
      return;
    }

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,snowfall,snow_depth,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code&forecast_days=14&temperature_unit=${temperatureUnit}`,
    )
      .then((response) => response.json())
      .then((data: IWeatherResponse) => {
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

        setWeatherData({ hourly: _hourly, daily: _daily });
      });
  }, [latitude, longitude, temperatureUnit]);

  return { weatherData };
}
