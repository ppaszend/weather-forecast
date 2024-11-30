import { useState } from "react";
import dayjs from "dayjs";
import Header from "./header";
import { IWeatherDay, IWeatherHour } from "@/interfaces";
import TabButton from "./tab-button";
import {
  TemperatureChart,
  PrecipitationProbabilityChart,
  WindSpeedChart,
} from "./charts";
import styles from "./styles.module.css";
import Timeline from "./timeline";

enum Tab {
  TEMPERATURE,
  PRECIPITATION,
  WIND,
}

interface IProps {
  hourlyForecast: IWeatherHour[];
  dailyForecast: IWeatherDay;
}

export default function UiDailyDetails({
  hourlyForecast,
  dailyForecast,
}: IProps) {
  const [selectedHour, setSelectedHour] = useState<dayjs.Dayjs>();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.TEMPERATURE);

  const shouldUseSelectedHour =
    selectedHour && dailyForecast.date.isSame(selectedHour, "day");

  const forecast = shouldUseSelectedHour
    ? hourlyForecast?.find(({ date }) => date.isSame(selectedHour, "hour"))
    : dailyForecast;

  const dateToDisplay = shouldUseSelectedHour
    ? dayjs(selectedHour).format("dddd, HH:mm")
    : dayjs(dailyForecast.date).format("dddd");

  if (!forecast) return;

  return (
    <div>
      <Header forecast={forecast} dateToDisplay={dateToDisplay} />
      <div className={styles.tabsContainer}>
        <TabButton
          isActive={activeTab === Tab.TEMPERATURE}
          text="Temperature"
          onClick={() => setActiveTab(Tab.TEMPERATURE)}
        />
        <span className={styles.tabSeparator} />
        <TabButton
          isActive={activeTab === Tab.PRECIPITATION}
          text="Precipitation"
          onClick={() => setActiveTab(Tab.PRECIPITATION)}
        />
        <span className={styles.tabSeparator} />
        <TabButton
          isActive={activeTab === Tab.WIND}
          text="Wind"
          onClick={() => setActiveTab(Tab.WIND)}
        />
      </div>
      <div className={styles.chartsScroll}>
        <div className={styles.chartsWrapper}>
          {activeTab === Tab.TEMPERATURE && (
            <TemperatureChart
              hourlyForecast={hourlyForecast}
              setSelectedHour={setSelectedHour}
            />
          )}
          {activeTab === Tab.PRECIPITATION && (
            <PrecipitationProbabilityChart hourlyForecast={hourlyForecast} />
          )}
          {activeTab === Tab.WIND && (
            <WindSpeedChart hourlyForecast={hourlyForecast} />
          )}
          <Timeline
            hourlyForecast={hourlyForecast}
            setSelectedHour={setSelectedHour}
          />
        </div>
      </div>
    </div>
  );
}
