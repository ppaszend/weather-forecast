import { useState } from "react";
import dayjs from "dayjs";
import { UiDailyDetails, UiWeek, UiSpinner } from "@/components";
import { IWeatherDay, IWeatherHour } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  weatherData?: {
    daily: IWeatherDay[];
    hourly: IWeatherHour[];
  };
  isLoading: boolean;
}

export default function UiWeather({ weatherData, isLoading }: IProps) {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(dayjs().format("YYYY-MM-DDT00:00:00.000Z")),
  );

  const selectedDateForecast = weatherData?.daily.find(({ date }) =>
    date.isSame(selectedDate, "day"),
  );

  if (isLoading) {
    return <UiSpinner />;
  }

  if (!weatherData) {
    return (
      <div className={styles.hint}>Select city to display weather forecast</div>
    );
  }

  return (
    <>
      {selectedDateForecast && (
        <UiDailyDetails
          hourlyForecast={weatherData.hourly.filter(({ date }) =>
            date.isSame(selectedDate, "day"),
          )}
          dailyForecast={selectedDateForecast}
        />
      )}
      <UiWeek
        weatherForecast={weatherData.daily}
        onDateChange={setSelectedDate}
        selectedDate={selectedDate}
      />
    </>
  );
}
