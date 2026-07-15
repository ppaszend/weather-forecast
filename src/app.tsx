import { useState } from "react";
import { TemperatureContext } from "@/context";
import { UiLocationSearch, UiWeather } from "@/components";
import { useWeatherData } from "@/hooks";
import { temperatureUnit } from "@/types";
import { ILocation } from "@/interfaces";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const [location, setLocation] = useState<ILocation>();
  const [temperatureUnit, setTemperatureUnit] =
    useState<temperatureUnit>("celsius");

  const { weatherData, isLoading } = useWeatherData({
    location,
    temperatureUnit,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TemperatureContext.Provider
        value={{ temperatureUnit, setTemperatureUnit }}
      >
        <div className="app">
          <UiLocationSearch location={location} onLocationChange={setLocation} />
          <UiWeather isLoading={isLoading} weatherData={weatherData} />
        </div>
      </TemperatureContext.Provider>
    </QueryClientProvider>
  );
}
