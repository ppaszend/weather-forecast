import { useState } from "react";
import dayjs from "dayjs";
import { UiDailyDetails, UiWeek, UiSpinner } from "@/components";
import { IWeatherDay, IWeatherHour } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  weatherData:
    | {
        daily: IWeatherDay[];
        hourly: IWeatherHour[];
      }
    | undefined;
}

export default function UiWeather({ weatherData }: IProps) {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(dayjs().format("YYYY-MM-DDT00:00:00.000Z")),
  );

  const selectedDateForecast = weatherData?.daily.find(({ date }) =>
    date.isSame(selectedDate, "day"),
  );

  if (!weatherData) {
    return (
      <div className={styles.app}>
        <UiSpinner />
      </div>
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
        data={weatherData.daily}
        onSelectedDateChange={setSelectedDate}
        selectedDate={selectedDate}
      />
    </>
  );
}
