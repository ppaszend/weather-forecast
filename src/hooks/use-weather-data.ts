import { useEffect, useState } from "react";
import { ILocation, IWeatherDay, IWeatherHour } from "@/interfaces";
import { temperatureUnit } from "@/types";
import { getWeatherForecastForCoordinates } from "@/api";

interface IProps {
  location?: ILocation;
  temperatureUnit: temperatureUnit;
}

export default function useWeatherData({ location, temperatureUnit }: IProps) {
  const [weatherData, setWeatherData] = useState<{
    daily: IWeatherDay[];
    hourly: IWeatherHour[];
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setWeatherData(undefined);
    setIsLoading(true);

    if (!location) {
      setIsLoading(false);
      return;
    }

    getWeatherForecastForCoordinates(
      {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      { temperatureUnit },
    ).then((weatherForecast) => {
      setWeatherData(weatherForecast);
      setIsLoading(false);
    });
  }, [location, temperatureUnit]);

  return { weatherData, isLoading };
}
