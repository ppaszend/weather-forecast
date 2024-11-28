import { WeatherCode } from "@/enums";

export default function getConditionsIcon(conditions?: WeatherCode) {
  switch (conditions) {
    case WeatherCode.CLEAR_SKY:
      return "/assets/weather-condition-icons/sun.png";
    case WeatherCode.MAINLY_CLEAR:
      return "/assets/weather-condition-icons/sun-and-cloud.png";
    case WeatherCode.PARTLY_CLOUDY:
      return "/assets/weather-condition-icons/partly-cloud.png";
    case WeatherCode.OVERCAST:
      return "/assets/weather-condition-icons/cloud.png";
    case WeatherCode.FOG:
      return "/assets/weather-condition-icons/fog.png";
    case WeatherCode.DEPOSITING_RIME_FOG:
      return "/assets/weather-condition-icons/fog.png";
    case WeatherCode.DRIZZLE_LIGHT:
      return "/assets/weather-condition-icons/rain-light.png";
    case WeatherCode.DRIZZLE_MODERATE:
      return "/assets/weather-condition-icons/rain-light.png";
    case WeatherCode.DRIZZLE_DENSE:
      return "/assets/weather-condition-icons/rain.png";
    case WeatherCode.FREEZING_DRIZZLE_LIGHT:
      return "/assets/weather-condition-icons/rain-light.png";
    case WeatherCode.FREEZING_DRIZZLE_DENSE:
      return "/assets/weather-condition-icons/rain.png";
    case WeatherCode.RAIN_SLIGHT:
      return "/assets/weather-condition-icons/rain-light.png";
    case WeatherCode.RAIN_MODERATE:
      return "/assets/weather-condition-icons/rain-and-cloud.png";
    case WeatherCode.RAIN_HEAVY:
      return "/assets/weather-condition-icons/rain.png";
    case WeatherCode.FREEZING_RAIN_LIGHT:
      return "/assets/weather-condition-icons/rain-light.png";
    case WeatherCode.FREEZING_RAIN_HEAVY:
      return "/assets/weather-condition-icons/rain.png";
    case WeatherCode.SNOW_FALL_SLIGHT:
      return "/assets/weather-condition-icons/snow-light.png";
    case WeatherCode.SNOW_FALL_MODERATE:
      return "/assets/weather-condition-icons/snow-light.png";
    case WeatherCode.SNOW_FALL_HEAVY:
      return "/assets/weather-condition-icons/snow.png";
    case WeatherCode.SNOW_GRAINS:
      return "/assets/weather-condition-icons/snow.png";
    case WeatherCode.RAIN_SHOWERS_SLIGHT:
      return "/assets/weather-condition-icons/rain-light.png";
    case WeatherCode.RAIN_SHOWERS_MODERATE:
      return "/assets/weather-condition-icons/rain.png";
    case WeatherCode.RAIN_SHOWERS_VIOLENT:
      return "/assets/weather-condition-icons/rain.png";
    case WeatherCode.SNOW_SHOWERS_SLIGHT:
      return "/assets/weather-condition-icons/snow-light.png";
    case WeatherCode.SNOW_SHOWERS_HEAVY:
      return "/assets/weather-condition-icons/snow.png";
    case WeatherCode.THUNDERSTORM_SLIGHT_OR_MODERATE:
      return "/assets/weather-condition-icons/rain-and-thunderstorm.png";
    case WeatherCode.THUNDERSTORM_WITH_SLIGHT_RAIL:
      return "/assets/weather-condition-icons/rain-and-thunderstorm.png";
    case WeatherCode.THUNDERSTORM_WITH_HEAVY_RAIL:
      return "/assets/weather-condition-icons/rain-and-thunderstorm.png";
  }
}
