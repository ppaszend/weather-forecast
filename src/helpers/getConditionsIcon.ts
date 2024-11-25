import { WeatherCode } from "@/enums";

export default function getConditionsIcon(conditions: WeatherCode) {
  switch (conditions) {
    case WeatherCode.OVERCAST:
      return "/assets/weather-condition-icons/cloudy.png";
    case WeatherCode.PARTLY_CLOUDY:
      return "/assets/weather-condition-icons/partly-cloudy.png";
    case WeatherCode.RAIN_MODERATE:
      return "/assets/weather-condition-icons/rainy-and-cloudy.png";
    case WeatherCode.RAIN_SLIGHT:
      return "/assets/weather-condition-icons/rainy-light.png";
    case WeatherCode.MAINLY_CLEAR:
      return "/assets/weather-condition-icons/sunny-and-cloudy.png";
    case WeatherCode.CLEAR_SKY:
      return "/assets/weather-condition-icons/sunny.png";
  }
}
