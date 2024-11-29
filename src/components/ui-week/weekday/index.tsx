import { getConditionsIcon } from "@/helpers";
import styles from "./styles.module.css";
import { Dayjs } from "dayjs";
import { WeatherCode } from "@/enums";
import classNames from "classnames";

interface IProps {
  isActive: boolean;
  date: Dayjs;
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
      className={classNames(styles.weekday, { [styles.isActive]: isActive })}
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
