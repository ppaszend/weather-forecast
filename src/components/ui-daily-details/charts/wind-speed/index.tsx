import { IWeatherHour } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  hourlyForecast: IWeatherHour[];
}

function calculateIconWidth(windSpeed: number): string {
  if (windSpeed < 12) {
    return "16px";
  }

  if (windSpeed < 26) {
    return "24px";
  }

  return "36px";
}

export default function WindSpeedChart({ hourlyForecast }: IProps) {
  const threeHourForecast = hourlyForecast.filter(
    (_, index) => (index + 2) % 3 === 0,
  );

  return (
    <div className={styles.windSpeedContainer}>
      {threeHourForecast.map(({ windSpeed, windDirection }, index) => (
        <div key={index} className={styles.windSpeedItem}>
          <div className={styles.windSpeedItemText}>
            {+windSpeed.toFixed()} km/h
          </div>
          <div className={styles.windSpeedIconWrapper}>
            <img
              style={{
                transform: `rotate(${windDirection + 90}deg)`,
                width: calculateIconWidth(windSpeed),
              }}
              src="/assets/wind-direction.svg"
              alt="Wind direction"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
