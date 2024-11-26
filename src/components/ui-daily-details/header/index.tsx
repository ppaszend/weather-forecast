import { useContext } from "react";
import { getConditionsIcon, getConditionsText } from "@/helpers";
import { IWeatherDay, IWeatherHour } from "@/interfaces";
import { TemperatureContext } from "@/context";
import UnitSwitcher from "./unit-switcher";
import styles from "./styles.module.css";

interface IProps {
  forecast: IWeatherDay | IWeatherHour;
  dateToDisplay: string;
}

function getTemperature(forecast: IWeatherDay | IWeatherHour) {
  if ("temperature" in forecast) {
    return forecast.temperature.toFixed();
  }

  if ("temperatureDay" in forecast) {
    return forecast.temperatureDay.toFixed();
  }
}

export default function Header({ forecast, dateToDisplay }: IProps) {
  const { temperatureUnit, setTemperatureUnit } =
    useContext(TemperatureContext);

  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <img
          className={styles.conditionsIcon}
          src={getConditionsIcon(forecast.weatherCode)}
          alt={forecast.weatherCode?.toString()}
        />
        <div className={styles.temperatureBig}>{getTemperature(forecast)}</div>
        <UnitSwitcher value={temperatureUnit} onChange={setTemperatureUnit} />
      </div>

      <div className={styles.weatherDescription}>
        Precipitation: {forecast.precipitationProbability}%<br />
        Humidity: {forecast.humidity}%<br />
        Wind: {forecast.windSpeed.toFixed()} km/h
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.rightContainerTitle}>Weather</div>
        <div className={styles.rightContainerDate}>
          {dateToDisplay}
          <br />
          {getConditionsText(forecast.weatherCode)}
        </div>
      </div>
    </div>
  );
}
