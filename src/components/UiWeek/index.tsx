import dayjs, { Dayjs } from "dayjs";
import UiWeekday from "./weekday";
import { WeatherCode } from "@/enums";
import { IWeather } from "@/interfaces";

interface IProps {
  data: IWeather[];
  selectedDate: Dayjs;
  onSelectedDateChange(date: Dayjs): void;
}

export default function UiWeek({
  data,
  selectedDate,
  onSelectedDateChange = () => {},
}: IProps) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {data.map(({ date, temperature }) => (
        <UiWeekday
          key={date.unix()}
          date={date}
          avgDay={temperature}
          avgNight={5}
          conditions={WeatherCode.CLEAR_SKY}
          onClick={() => onSelectedDateChange(date)}
          isActive={dayjs(selectedDate).isSame(date, "day")}
        />
      ))}
    </div>
  );
}
