import { IWeather } from "@/interfaces";
import styles from "./styles.module.css";
import { Dayjs } from "dayjs";

interface IProps {
  hourlyForecast: IWeather[];
  setSelectedHour(data: Dayjs): void;
}

export default function Timeline({ hourlyForecast, setSelectedHour }: IProps) {
  return (
    <div className={styles.timeline}>
      {hourlyForecast.map(
        ({ date }, index) =>
          index % 3 === 0 && (
            <button
              key={index}
              className={styles.timelineItem}
              onClick={() => setSelectedHour(date)}
            >
              <div className={styles.timelineItemText}>
                {date?.format("HH:mm")}
              </div>
            </button>
          ),
      )}
    </div>
  );
}
