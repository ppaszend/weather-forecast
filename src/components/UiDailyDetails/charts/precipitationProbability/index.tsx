import { IWeather } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  hourlyForecast: IWeather[];
}

export default function PrecipitationProbabilityChart({
  hourlyForecast,
}: IProps) {
  return (
    <div className={styles.precipitationProbabilityContainer}>
      <div className={styles.upperContainer}>
        {hourlyForecast.map(
          ({ precipitationProbability }, index) =>
            index % 3 === 0 && (
              <div key={index} className={styles.precipitationProbabilityItem}>
                <div className={styles.precipitationProbabilityItemText}>
                  {+precipitationProbability.toFixed(0)}%
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
              style={{ height: `${precipitationProbability}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
