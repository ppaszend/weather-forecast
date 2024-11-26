import dayjs, { Dayjs } from "dayjs";
import UiWeekday from "./weekday";
import { IWeatherDay } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  data: IWeatherDay[];
  selectedDate: Dayjs;
  onSelectedDateChange(date: Dayjs): void;
}

export default function UiWeek({
  data,
  selectedDate,
  onSelectedDateChange = () => {},
}: IProps) {
  return (
    <div className={styles.week}>
      {data.map(({ date, temperatureDay, temperatureNight, weatherCode }) => (
        <UiWeekday
          key={date.unix()}
          date={date}
          avgDay={temperatureDay}
          avgNight={temperatureNight}
          conditions={weatherCode}
          onClick={() => onSelectedDateChange(date)}
          isActive={dayjs(selectedDate).isSame(date, "day")}
        />
      ))}
    </div>
  );
}
