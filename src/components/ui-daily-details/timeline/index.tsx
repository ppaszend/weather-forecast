import { IWeatherHour } from "@/interfaces";
import styles from "./styles.module.css";
import { Dayjs } from "dayjs";

interface IProps {
  hourlyForecast: IWeatherHour[];
  setSelectedHour(data: Dayjs): void;
}

export default function Timeline({ hourlyForecast, setSelectedHour }: IProps) {
  return (
    <div className={styles.timeline}>
      {hourlyForecast.map(
        ({ date }, index) =>
          (index + 2) % 3 === 0 && (
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
