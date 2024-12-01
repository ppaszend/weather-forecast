import { IWeatherHour } from "@/interfaces";
import { Dayjs } from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  hourlyForecast: IWeatherHour[];
  setSelectedHour(date: Dayjs): void;
}

const HEIGHT = 92;
const TOP_OFFSET = 20;
const BOTTOM_OFFSET = 10;
const innerHeight = HEIGHT - TOP_OFFSET - BOTTOM_OFFSET;

function relativeSize(value: number) {
  return value * (window.devicePixelRatio || 1);
}

const COLORS = {
  stroke: "#ffcc00",
  fill: "#4c4219",
  text: "#FFFFFF",
};

export default function TemperatureChart({ hourlyForecast }: IProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState<number>(0);

  const drawChart = useCallback(
    (hourlyForecast: IWeatherHour[], width: number) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      const minTemp = Math.min(...hourlyForecast.map((w) => w.temperature));
      const maxTemp = Math.max(...hourlyForecast.map((w) => w.temperature));
      const tempDiff = maxTemp - minTemp;

      const pixelWidth = relativeSize(width);
      const pixelHeight = relativeSize(HEIGHT);
      const pixelInnerHeight = relativeSize(innerHeight);

      ctx.reset();
      ctx.strokeStyle = COLORS.stroke;
      ctx.fillStyle = COLORS.text;
      ctx.lineWidth = relativeSize(3);
      ctx.beginPath();

      function calcX(index: number) {
        return (index / (hourlyForecast.length - 1)) * pixelWidth;
      }

      function calcY(temperature: number) {
        return (
          0 -
          ((temperature - minTemp) / tempDiff) * pixelInnerHeight +
          (pixelHeight - BOTTOM_OFFSET)
        );
      }

      function drawStroke(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = COLORS.stroke;
        ctx.lineWidth = 2;

        ctx.beginPath();
        hourlyForecast.map(({ temperature }, index) => {
          if (index === 0) {
            ctx.moveTo(0, calcY(temperature));
          } else {
            ctx.lineTo(calcX(index), calcY(temperature));
          }
        });
        ctx.stroke();
      }

      function drawFill(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = COLORS.fill;

        const region = new Path2D();
        hourlyForecast.map(({ temperature }, index) => {
          if (index === 0) {
            region.moveTo(0, calcY(temperature));
            return;
          } else {
            region.lineTo(calcX(index), calcY(temperature));
          }
        });
        region.lineTo(pixelWidth, pixelHeight);
        region.lineTo(0, pixelHeight);
        region.closePath();
        ctx.fill(region);
      }

      function drawTexts(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = COLORS.text;
        console.log(ctx.font);
        ctx.font = `${relativeSize(12)}px sans-serif`;

        hourlyForecast.map(({ temperature }, index) => {
          if ((index + 2) % 3 === 0) {
            ctx.fillText(
              temperature.toFixed(),
              calcX(index),
              calcY(temperature) - relativeSize(8),
            );
          }
        });
      }

      drawStroke(ctx);
      drawFill(ctx);
      drawTexts(ctx);
      ctx.scale(relativeSize(1), relativeSize(1));
    },
    [],
  );

  useEffect(() => {
    drawChart(hourlyForecast, wrapperWidth);
  }, [hourlyForecast, drawChart, wrapperWidth]);

  useEffect(() => {
    if (wrapperRef.current) {
      new ResizeObserver((a) => {
        setWrapperWidth(a[0].contentRect.width);
      }).observe(wrapperRef.current);
    }
  });

  return (
    <div ref={wrapperRef}>
      <canvas
        width={relativeSize(wrapperWidth)}
        height={relativeSize(HEIGHT)}
        style={{
          width: `${wrapperWidth}px`,
          height: `${HEIGHT}px`,
        }}
        ref={canvasRef}
      />
    </div>
  );
}
