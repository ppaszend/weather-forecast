import { IWeather } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  hourlyForecast: IWeather[];
}

export default function WindSpeedChart({ hourlyForecast }: IProps) {
  const threeHourForecast = hourlyForecast.filter(
    (_, index) => index % 3 === 0,
  );

  return (
    <div className={styles.windSpeedContainer}>
      {threeHourForecast.map(({ windSpeed, windDirection }, index) => (
        <div key={index} className={styles.windSpeedItem}>
          <div className={styles.windSpeedItemText}>
            {+windSpeed.toFixed(0)} km/h
          </div>
          <img
            className={styles.windSpeedIcon}
            style={{
              transform: `rotate(${windDirection + 90}deg)`,
            }}
            src="/assets/wind-direction.svg"
            alt="Wind direction"
          />
        </div>
      ))}
    </div>
  );
}
