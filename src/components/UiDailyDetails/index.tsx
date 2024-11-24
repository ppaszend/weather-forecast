import { useState } from "react";
import dayjs from "dayjs";
import Header from "./header";
import { IWeather } from "@/interfaces";

interface IProps {
  hourlyForecast: IWeather[];
  dailyForecast: IWeather;
}

export default function UiDailyDetails({
  hourlyForecast,
  dailyForecast,
}: IProps) {
  const [selectedHour, setSelectedHour] = useState<dayjs.Dayjs>();
  const forecast = selectedHour
    ? hourlyForecast?.find(({ date }) => date.isSame(selectedHour, "hour"))
    : dailyForecast;
  const dateToDisplay = selectedHour
    ? dayjs(selectedHour).format("dddd, HH:mm")
    : dayjs(dailyForecast.date).format("dddd");

  if (!forecast) {
    return;
  }

  return (
    <div>
      <Header forecast={forecast} dateToDisplay={dateToDisplay} />

      {hourlyForecast.map(({ date, temperature }) => (
        <button key={date.unix()} onClick={() => setSelectedHour(date)}>
          {date?.format("HH:mm")} | {+temperature.toFixed(0)}°C
        </button>
      ))}
    </div>
  );
}
