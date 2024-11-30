import dayjs, { Dayjs } from "dayjs";
import UiWeekday from "./weekday";
import { IWeatherDay } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  weatherForecast: IWeatherDay[];
  selectedDate: Dayjs;
  onDateChange(date: Dayjs): void;
}

export default function UiWeek({
  weatherForecast,
  selectedDate,
  onDateChange = () => {},
}: IProps) {
  return (
    <div className={styles.week}>
      {weatherForecast.map((weatherForecast) => (
        <UiWeekday
          key={weatherForecast.date.unix()}
          weatherForecast={weatherForecast}
          isActive={dayjs(selectedDate).isSame(weatherForecast.date, "day")}
          onClick={() => onDateChange(weatherForecast.date)}
        />
      ))}
    </div>
  );
}
