import { useEffect, useRef, useState } from "react";
import { Dayjs } from "dayjs";
import { IWeatherHour } from "@/interfaces";
import TemperatureChartDrawer from "./temperature-chart-drawer";

interface IProps {
  hourlyForecast: IWeatherHour[];
  setSelectedHour(date: Dayjs): void;
}

const HEIGHT = 92;
const TOP_OFFSET = 20;
const BOTTOM_OFFSET = 10;

const COLORS = {
  stroke: "#ffcc00",
  fill: "#4c4219",
  text: "#FFFFFF",
};

export default function TemperatureChart({ hourlyForecast }: IProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState<number>(0);
  const [temperatureChart, setTemperatureChart] =
    useState<TemperatureChartDrawer>();

  useEffect(() => {
    if (wrapperRef.current) {
      new ResizeObserver((a) => {
        setWrapperWidth(a[0].contentRect.width);
      }).observe(wrapperRef.current);
    }

    const _ctx = canvasRef.current?.getContext("2d");
    if (_ctx) {
      setTemperatureChart(
        new TemperatureChartDrawer(_ctx, TOP_OFFSET, BOTTOM_OFFSET, COLORS),
      );
    }
  }, []);

  useEffect(() => {
    if (temperatureChart) {
      temperatureChart.canvasWidth = wrapperWidth;
      temperatureChart.canvasHeight = HEIGHT;
      temperatureChart.render(hourlyForecast);
    }
  }, [hourlyForecast, temperatureChart, wrapperWidth]);

  return (
    <div ref={wrapperRef}>
      <canvas
        width={TemperatureChartDrawer.relativeSize(wrapperWidth)}
        height={TemperatureChartDrawer.relativeSize(HEIGHT)}
        style={{
          width: `${wrapperWidth}px`,
          height: `${HEIGHT}px`,
        }}
        ref={canvasRef}
      />
    </div>
  );
}
