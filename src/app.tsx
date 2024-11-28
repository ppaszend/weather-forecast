import { useState } from "react";
import { TemperatureContext } from "@/context";
import { UiSearchInput, UiWeather } from "@/components";
import { useWeatherData, useCitySearch } from "@/hooks";
import { temperatureUnit } from "@/types";
import { ICity } from "@/interfaces";
import styles from "./styles.module.css";

export default function App() {
  const [citySearchQuery, setCitySearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<ICity | undefined>();
  const [temperatureUnit, setTemperatureUnit] =
    useState<temperatureUnit>("celsius");

  const { weatherData, isLoading } = useWeatherData({
    latitude: selectedCity?.latitude,
    longitude: selectedCity?.longitude,
    temperatureUnit,
  });

  const { results } = useCitySearch({ query: citySearchQuery });

  return (
    <TemperatureContext.Provider
      value={{ temperatureUnit, setTemperatureUnit }}
    >
      <div className={styles.app}>
        <UiSearchInput
          citySearchQuery={citySearchQuery}
          setCitySearchQuery={setCitySearchQuery}
          results={results}
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
        />
        <UiWeather isLoading={isLoading} weatherData={weatherData} />
      </div>
    </TemperatureContext.Provider>
  );
}
