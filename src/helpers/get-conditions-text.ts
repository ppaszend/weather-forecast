import { WeatherCode } from "@/enums";

export default function getConditionsText(conditions?: WeatherCode) {
  switch (conditions) {
    case WeatherCode.CLEAR_SKY:
      return "Clear sky";
    case WeatherCode.MAINLY_CLEAR:
      return "Mainly clear";
    case WeatherCode.PARTLY_CLOUDY:
      return "Partly cloudy";
    case WeatherCode.OVERCAST:
      return "Overcast";
    case WeatherCode.FOG:
      return "Fog";
    case WeatherCode.DEPOSITING_RIME_FOG:
      return "Depositing rime fog";
    case WeatherCode.DRIZZLE_LIGHT:
      return "Drizzle light";
    case WeatherCode.DRIZZLE_MODERATE:
      return "Drizzle moderate";
    case WeatherCode.DRIZZLE_DENSE:
      return "Drizzle dense";
    case WeatherCode.FREEZING_DRIZZLE_LIGHT:
      return "Freezing drizzle light";
    case WeatherCode.FREEZING_DRIZZLE_DENSE:
      return "Freezing drizzle dense";
    case WeatherCode.RAIN_SLIGHT:
      return "Rain slight";
    case WeatherCode.RAIN_MODERATE:
      return "Rain moderate";
    case WeatherCode.RAIN_HEAVY:
      return "Rain heavy";
    case WeatherCode.FREEZING_RAIN_LIGHT:
      return "Freezing rain light";
    case WeatherCode.FREEZING_RAIN_HEAVY:
      return "Freezing rain heavy";
    case WeatherCode.SNOW_FALL_SLIGHT:
      return "Snow fall slight";
    case WeatherCode.SNOW_FALL_MODERATE:
      return "Snow fall moderate";
    case WeatherCode.SNOW_FALL_HEAVY:
      return "Snow fall heavy";
    case WeatherCode.SNOW_GRAINS:
      return "Snow grains";
    case WeatherCode.RAIN_SHOWERS_SLIGHT:
      return "Rain showers slight";
    case WeatherCode.RAIN_SHOWERS_MODERATE:
      return "Rain showers moderate";
    case WeatherCode.RAIN_SHOWERS_VIOLENT:
      return "Rain showers violent";
    case WeatherCode.SNOW_SHOWERS_SLIGHT:
      return "Snow showers slight";
    case WeatherCode.SNOW_SHOWERS_HEAVY:
      return "Snow showers heave";
    case WeatherCode.THUNDERSTORM_SLIGHT_OR_MODERATE:
      return "Thunderstorm slight or moderate";
    case WeatherCode.THUNDERSTORM_WITH_SLIGHT_RAIL:
      return "Thunderstorm with slight rail";
    case WeatherCode.THUNDERSTORM_WITH_HEAVY_RAIL:
      return "Thunderstorm with heavy rail";
  }
}
