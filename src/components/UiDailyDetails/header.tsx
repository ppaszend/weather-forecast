import { WeatherCode } from "@/enums";
import { getConditionsIcon } from "@/helpers";
import styles from "./header.module.css";
import { IWeather } from "@/interfaces";

interface IProps {
  forecast: IWeather;
  dateToDisplay: string;
}

export default function Header({ forecast, dateToDisplay }: IProps) {
  return (
    <div className={styles.row}>
      <div className={styles.row}>
        <img src={getConditionsIcon(WeatherCode.CLEAR_SKY)} alt="Clear sky" />
        <div className={styles.temperatureBig}>
          {+forecast.temperature.toFixed(0)}
        </div>
        <div>°C</div>|<div style={{ color: "#BBB" }}>°F</div>
      </div>

      <div style={{ marginLeft: "8px", fontSize: "13px", color: "#BBB" }}>
        Szansa opadów: {forecast.precipitationProbability}%<br />
        Wilgotność: {forecast.humidity}%<br />
        Wiatr: {forecast.windSpeed} km/h
      </div>

      <div style={{ marginLeft: "auto", textAlign: "right" }}>
        <div style={{ fontSize: "24px" }}>Pogoda</div>
        <div style={{ color: "#BBB", fontSize: "14px" }}>
          {dateToDisplay}
          <br />
          {forecast.weatherCode}
        </div>
      </div>
    </div>
  );
}
