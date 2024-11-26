import { getConditionsIcon } from "@/helpers";
import styles from "./styles.module.css";
import dayjs from "dayjs";
import { WeatherCode } from "@/enums";

interface IProps {
  isActive: boolean;
  date: dayjs.Dayjs;
  avgDay: number;
  avgNight: number;
  conditions?: WeatherCode;
  onClick(date: string): void;
}

export default function UiWeekday({
  isActive,
  date,
  avgDay,
  avgNight,
  conditions,
  onClick = () => {},
}: IProps) {
  return (
    <button
      className={[styles.weekday, isActive && styles.isActive].join(" ")}
      onClick={() => onClick(date.format("YYYY-MM-DDT00:00:00.000Z"))}
    >
      <div>{date.format("ddd")}</div>
      <img
        src={getConditionsIcon(conditions)}
        alt="conditions"
        className={styles.conditionsIcon}
      />
      <div className={styles.averageTemperature}>
        <div className={styles.averageTemperatureDay}>{avgDay}°</div>
        <div className={styles.averageTemperatureNight}>{avgNight}°</div>
      </div>
    </button>
  );
}
