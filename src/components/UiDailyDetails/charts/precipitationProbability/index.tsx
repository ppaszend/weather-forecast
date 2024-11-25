import { IWeatherHour } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  hourlyForecast: IWeatherHour[];
}

export default function PrecipitationProbabilityChart({
  hourlyForecast,
}: IProps) {
  return (
    <div className={styles.precipitationProbabilityContainer}>
      <div className={styles.upperContainer}>
        {hourlyForecast.map(
          ({ precipitationProbability }, index) =>
            (index + 2) % 3 === 0 && (
              <div key={index} className={styles.precipitationProbabilityItem}>
                <div className={styles.precipitationProbabilityItemText}>
                  {+precipitationProbability.toFixed()}%
                </div>
              </div>
            ),
        )}
      </div>

      <div className={styles.bottomContainer}>
        {hourlyForecast.map(({ precipitationProbability }, index) => (
          <div key={index} className={styles.precipitationProbabilityItem}>
            <div
              className={styles.precipitationProbabilityColumn}
              style={{ height: `${+precipitationProbability.toFixed()}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
