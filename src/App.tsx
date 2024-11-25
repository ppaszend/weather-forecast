import { useState } from "react";
import dayjs from "dayjs";
import { useWeatherData } from "@/hooks";
import { UiDailyDetails, UiWeek } from "@/components";
import styles from "./styles.module.css";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(dayjs().format("YYYY-MM-DDT00:00:00.000Z")),
  );
  const { hourly, daily } = useWeatherData({
    latitude: 50.1,
    longitude: 18.54,
  });

  if (!hourly || !daily) {
    return <div>Loading...</div>;
  }

  const selectedDateForecast = daily.find(({ date }) =>
    date.isSame(selectedDate, "day"),
  );

  return (
    <div className={styles.app}>
      {selectedDateForecast && (
        <UiDailyDetails
          hourlyForecast={hourly.filter(({ date }) =>
            date.isSame(selectedDate, "day"),
          )}
          dailyForecast={selectedDateForecast}
        />
      )}
      <UiWeek
        data={daily}
        onSelectedDateChange={setSelectedDate}
        selectedDate={selectedDate}
      />
    </div>
  );
}
