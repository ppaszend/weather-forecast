import classNames from "classnames";
import { getConditionsIcon } from "@/helpers";
import { IWeatherDay } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  isActive: boolean;
  weatherForecast: IWeatherDay;
  onClick(date: string): void;
}

export default function UiWeekday({
  isActive,
  weatherForecast,
  onClick = () => {},
}: IProps) {
  const { date, weatherCode, temperatureDay, temperatureNight } =
    weatherForecast;

  return (
    <button
      className={classNames(styles.weekday, { [styles.isActive]: isActive })}
      onClick={() => onClick(date.format("YYYY-MM-DDT00:00:00.000Z"))}
    >
      <div>{date.format("ddd")}</div>
      <img
        src={getConditionsIcon(weatherCode)}
        alt="conditions"
        className={styles.conditionsIcon}
      />
      <div className={styles.averageTemperature}>
        <div className={styles.averageTemperatureDay}>{temperatureDay}°</div>
        <div className={styles.averageTemperatureNight}>
          {temperatureNight}°
        </div>
      </div>
    </button>
  );
}
