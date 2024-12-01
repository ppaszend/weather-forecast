import { IWeatherHour } from "@/interfaces";

export default class TemperatureChartDrawer {
  hourlyForecast: IWeatherHour[] = [];
  private _canvasWidth: number = 0;
  private _canvasHeight: number = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private topOffset: number,
    private bottomOffset: number,
    private colors: {
      text: string;
      fill: string;
      stroke: string;
    },
  ) {}

  get canvasInnerHeight() {
    return this.canvasHeight - this.topOffset - this.bottomOffset;
  }

  get minTemp() {
    return Math.min(...this.hourlyForecast.map((w) => w.temperature));
  }

  get maxTemp() {
    return Math.max(...this.hourlyForecast.map((w) => w.temperature));
  }

  get tempDiff() {
    return this.maxTemp - this.minTemp;
  }

  get canvasWidth() {
    return this._canvasWidth;
  }

  set canvasWidth(value: number) {
    this._canvasWidth = value;
  }

  get canvasHeight() {
    return this._canvasHeight;
  }

  set canvasHeight(value: number) {
    this._canvasHeight = value;
  }

  static relativeSize(value: number) {
    return value * window.devicePixelRatio;
  }

  private calcX(index: number) {
    return (
      (index / (this.hourlyForecast.length - 1)) *
      TemperatureChartDrawer.relativeSize(this.canvasWidth)
    );
  }

  private calcY(temperature: number) {
    return (
      0 -
      ((temperature - this.minTemp) / this.tempDiff) *
        TemperatureChartDrawer.relativeSize(this.canvasInnerHeight) +
      (TemperatureChartDrawer.relativeSize(this.canvasHeight) -
        this.bottomOffset)
    );
  }

  private drawStroke(hourlyForecast: IWeatherHour[]) {
    this.ctx.strokeStyle = this.colors.stroke;
    this.ctx.lineWidth = TemperatureChartDrawer.relativeSize(3);

    this.ctx.beginPath();
    hourlyForecast.map(({ temperature }, index) => {
      if (index === 0) {
        this.ctx.moveTo(0, this.calcY(temperature));
      } else {
        this.ctx.lineTo(this.calcX(index), this.calcY(temperature));
      }
    });
    this.ctx.stroke();
  }

  private drawFill(hourlyForecast: IWeatherHour[]) {
    this.ctx.fillStyle = this.colors.fill;

    const region = new Path2D();
    hourlyForecast.map(({ temperature }, index) => {
      if (index === 0) {
        region.moveTo(0, this.calcY(temperature));
      } else {
        region.lineTo(this.calcX(index), this.calcY(temperature));
      }
    });
    region.lineTo(
      TemperatureChartDrawer.relativeSize(this.canvasWidth),
      TemperatureChartDrawer.relativeSize(this.canvasHeight),
    );
    region.lineTo(0, TemperatureChartDrawer.relativeSize(this.canvasHeight));
    region.closePath();
    this.ctx.fill(region);
  }

  private drawTexts(hourlyForecast: IWeatherHour[]) {
    this.ctx.fillStyle = this.colors.text;
    this.ctx.font = `${TemperatureChartDrawer.relativeSize(12)}px sans-serif`;

    hourlyForecast.map(({ temperature }, index) => {
      if ((index + 2) % 3 === 0) {
        this.ctx.fillText(
          temperature.toFixed(),
          this.calcX(index),
          this.calcY(temperature) - TemperatureChartDrawer.relativeSize(8),
        );
      }
    });
  }

  render(hourlyForecast: IWeatherHour[]) {
    this.ctx.reset();
    this.hourlyForecast = hourlyForecast;
    this.drawStroke(hourlyForecast);
    this.drawFill(hourlyForecast);
    this.drawTexts(hourlyForecast);
    this.ctx.scale(
      TemperatureChartDrawer.relativeSize(1),
      TemperatureChartDrawer.relativeSize(1),
    );
  }
}
