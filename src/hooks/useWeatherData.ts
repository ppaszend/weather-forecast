import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAverage, getWeatherCodeById } from "@/helpers";
import { IResponse, IWeather } from "@/interfaces";

export default function useWeatherData({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [hourly, setHourly] = useState<IWeather[]>();
  const [daily, setDaily] = useState<IWeather[]>();

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,snowfall,snow_depth,weather_code,wind_speed_10m&forecast_days=14`,
    )
      .then((response) => response.json())
      .then((data: IResponse) => {
        const _hourly: IWeather[] = data.hourly.time.map((time, index) => ({
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
        }));

        const _daily: IWeather[] = Object.entries(
          Object.groupBy(_hourly, ({ date }) =>
            date.format("YYYY-MM-DDT00:00:00.000Z"),
          ),
        ).map(([date, hourly]) => {
          if (!hourly) {
            throw new Error("Hourly is undefined");
          }

          return {
            date: dayjs(date),
            precipitationProbability: +getAverage(
              hourly.map((w) => w.precipitationProbability),
            ).toFixed(0),
            rain: +getAverage(hourly.map((w) => w.rain)).toFixed(0),
            humidity: +getAverage(hourly.map((w) => w.humidity)).toFixed(0),
            snowDepth: +getAverage(hourly.map((w) => w.snowDepth)).toFixed(0),
            snowfall: +getAverage(hourly.map((w) => w.snowfall)).toFixed(0),
            temperature: +getAverage(hourly.map((w) => w.temperature)).toFixed(
              0,
            ),
            weatherCode: hourly[0].weatherCode,
            windSpeed: +getAverage(hourly.map((w) => w.windSpeed)).toFixed(0),
          };
        });

        setHourly(_hourly);
        setDaily(_daily);
      });
  }, [latitude, longitude]);

  return { hourly, daily };
}
