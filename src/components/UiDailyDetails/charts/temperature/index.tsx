import { IWeather } from "@/interfaces";
import { Dayjs } from "dayjs";

interface IProps {
  hourlyForecast: IWeather[];
  setSelectedHour(date: Dayjs): void;
}

export default function TemperatureChart({
  hourlyForecast,
  setSelectedHour,
}: IProps) {
  return hourlyForecast.map(({ date, temperature }) => (
    <button key={date.unix()} onClick={() => setSelectedHour(date)}>
      {date?.format("HH:mm")} | {+temperature.toFixed(0)}°C
    </button>
  ));
}
