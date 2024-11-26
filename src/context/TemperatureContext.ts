import { createContext } from "react";
import { temperatureUnit } from "@/types";

const TemperatureContext = createContext<{
  temperatureUnit: temperatureUnit;
  setTemperatureUnit(temperatureUnit: temperatureUnit): void;
}>({
  temperatureUnit: "celsius",
  setTemperatureUnit() {},
});

export default TemperatureContext;
