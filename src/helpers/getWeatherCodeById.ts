import { WeatherCode } from "@/enums";

export default function getWeatherCodeById(
  weatherCodeId: number,
): WeatherCode | undefined {
  switch (weatherCodeId) {
    case 0:
      return WeatherCode.CLEAR_SKY;
    case 1:
      return WeatherCode.MAINLY_CLEAR;
    case 2:
      return WeatherCode.PARTLY_CLOUDY;
    case 3:
      return WeatherCode.OVERCAST;
    case 45:
      return WeatherCode.FOG;
    case 48:
      return WeatherCode.DEPOSITING_RIME_FOG;
    case 51:
      return WeatherCode.DRIZZLE_LIGHT;
    case 53:
      return WeatherCode.DRIZZLE_MODERATE;
    case 55:
      return WeatherCode.DRIZZLE_DENSE;
    case 56:
      return WeatherCode.FREEZING_DRIZZLE_LIGHT;
    case 57:
      return WeatherCode.FREEZING_DRIZZLE_DENSE;
    case 61:
      return WeatherCode.RAIN_SLIGHT;
    case 63:
      return WeatherCode.RAIN_MODERATE;
    case 65:
      return WeatherCode.RAIN_HEAVY;
    case 66:
      return WeatherCode.FREEZING_RAIN_LIGHT;
    case 67:
      return WeatherCode.FREEZING_RAIN_HEAVY;
    case 71:
      return WeatherCode.SNOW_FALL_SLIGHT;
    case 73:
      return WeatherCode.SNOW_FALL_MODERATE;
    case 75:
      return WeatherCode.SNOW_FALL_HEAVY;
    case 77:
      return WeatherCode.SNOW_GRAINS;
    case 80:
      return WeatherCode.RAIN_SHOWERS_SLIGHT;
    case 81:
      return WeatherCode.RAIN_SHOWERS_MODERATE;
    case 82:
      return WeatherCode.RAIN_SHOWERS_VIOLENT;
    case 85:
      return WeatherCode.SNOW_SHOWERS_SLIGHT;
    case 86:
      return WeatherCode.SNOW_SHOWERS_HEAVY;
    case 95:
      return WeatherCode.THUNDERSTORM_SLIGHT_OR_MODERATE;
    case 96:
      return WeatherCode.THUNDERSTORM_WITH_SLIGHT_RAIL;
    case 99:
      return WeatherCode.THUNDERSTORM_WITH_HEAVY_RAIL;
  }
}
