import { WeatherCode } from "@/enums";

export default function getConditionsIcon(conditions: WeatherCode) {
  switch (conditions) {
    case WeatherCode.OVERCAST:
      return "/assets/cloudy.png";
    case WeatherCode.PARTLY_CLOUDY:
      return "/assets/partly-cloudy.png";
    case WeatherCode.RAIN_MODERATE:
      return "/assets/rainy-and-cloudy.png";
    case WeatherCode.RAIN_SLIGHT:
      return "/assets/rainy-light.png";
    case WeatherCode.MAINLY_CLEAR:
      return "/assets/sunny-and-cloudy.png";
    case WeatherCode.CLEAR_SKY:
      return "/assets/sunny.png";
  }
}
