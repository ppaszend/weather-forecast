import { getConditionsIcon, getConditionsText } from "@/helpers";
import styles from "./styles.module.css";
import { IWeatherDay, IWeatherHour } from "@/interfaces";

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
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <img
          className={styles.conditionsIcon}
          src={getConditionsIcon(forecast.weatherCode)}
          alt={forecast.weatherCode?.toString()}
        />
        <div className={styles.temperatureBig}>{getTemperature(forecast)}</div>
        <div>°C</div>|<div style={{ color: "#BBB" }}>°F</div>
      </div>

      <div style={{ marginLeft: "8px", fontSize: "13px", color: "#BBB" }}>
        Precipitation: {forecast.precipitationProbability}%<br />
        Humidity: {forecast.humidity}%<br />
        Wind: {forecast.windSpeed.toFixed()} km/h
      </div>

      <div style={{ marginLeft: "auto", textAlign: "right" }}>
        <div style={{ fontSize: "20px" }}>Weather</div>
        <div style={{ color: "#BBB", fontSize: "14px" }}>
          {dateToDisplay}
          <br />
          {getConditionsText(forecast.weatherCode)}
        </div>
      </div>
    </div>
  );
}
