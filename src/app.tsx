import { useState } from "react";
import { TemperatureContext } from "@/context";
import { UiLocationSearch, UiWeather } from "@/components";
import { useWeatherData } from "@/hooks";
import { temperatureUnit } from "@/types";
import { ILocation } from "@/interfaces";
import styles from "./styles.module.css";

export default function App() {
  const [location, setLocation] = useState<ILocation>();
  const [temperatureUnit, setTemperatureUnit] =
    useState<temperatureUnit>("celsius");

  const { weatherData, isLoading } = useWeatherData({
    location,
    temperatureUnit,
  });

  return (
    <TemperatureContext.Provider
      value={{ temperatureUnit, setTemperatureUnit }}
    >
      <div className={styles.app}>
        <UiLocationSearch location={location} onLocationChange={setLocation} />
        <UiWeather isLoading={isLoading} weatherData={weatherData} />
      </div>
    </TemperatureContext.Provider>
  );
}
