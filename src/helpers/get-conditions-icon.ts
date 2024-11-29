import { WeatherCode } from "@/enums";

const ICONS_PATH = "/assets/weather-condition-icons/";

function getIconName(conditions?: WeatherCode) {
  switch (conditions) {
    case WeatherCode.CLEAR_SKY:
      return "sun.png";
    case WeatherCode.MAINLY_CLEAR:
      return "sun-and-cloud.png";
    case WeatherCode.PARTLY_CLOUDY:
      return "partly-cloud.png";
    case WeatherCode.OVERCAST:
      return "cloud.png";
    case WeatherCode.FOG:
      return "fog.png";
    case WeatherCode.DEPOSITING_RIME_FOG:
      return "fog.png";
    case WeatherCode.DRIZZLE_LIGHT:
      return "rain-light.png";
    case WeatherCode.DRIZZLE_MODERATE:
      return "rain-light.png";
    case WeatherCode.DRIZZLE_DENSE:
      return "rain.png";
    case WeatherCode.FREEZING_DRIZZLE_LIGHT:
      return "rain-light.png";
    case WeatherCode.FREEZING_DRIZZLE_DENSE:
      return "rain.png";
    case WeatherCode.RAIN_SLIGHT:
      return "rain-light.png";
    case WeatherCode.RAIN_MODERATE:
      return "rain-and-cloud.png";
    case WeatherCode.RAIN_HEAVY:
      return "rain.png";
    case WeatherCode.FREEZING_RAIN_LIGHT:
      return "rain-light.png";
    case WeatherCode.FREEZING_RAIN_HEAVY:
      return "rain.png";
    case WeatherCode.SNOW_FALL_SLIGHT:
      return "snow-light.png";
    case WeatherCode.SNOW_FALL_MODERATE:
      return "snow-light.png";
    case WeatherCode.SNOW_FALL_HEAVY:
      return "snow.png";
    case WeatherCode.SNOW_GRAINS:
      return "snow.png";
    case WeatherCode.RAIN_SHOWERS_SLIGHT:
      return "rain-light.png";
    case WeatherCode.RAIN_SHOWERS_MODERATE:
      return "rain.png";
    case WeatherCode.RAIN_SHOWERS_VIOLENT:
      return "rain.png";
    case WeatherCode.SNOW_SHOWERS_SLIGHT:
      return "snow-light.png";
    case WeatherCode.SNOW_SHOWERS_HEAVY:
      return "snow.png";
    case WeatherCode.THUNDERSTORM_SLIGHT_OR_MODERATE:
      return "rain-and-thunderstorm.png";
    case WeatherCode.THUNDERSTORM_WITH_SLIGHT_RAIL:
      return "rain-and-thunderstorm.png";
    case WeatherCode.THUNDERSTORM_WITH_HEAVY_RAIL:
      return "rain-and-thunderstorm.png";
  }
}

export default function getConditionsIcon(conditions?: WeatherCode) {
  return ICONS_PATH + getIconName(conditions);
}
