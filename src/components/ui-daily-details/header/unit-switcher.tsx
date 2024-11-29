import classNames from "classnames";
import styles from "./unit-switcher.module.css";
import { temperatureUnit } from "@/types";

export default function UnitSwitcher({
  value,
  onChange,
}: {
  value: temperatureUnit;
  onChange(unit: temperatureUnit): void;
}) {
  return (
    <div className={styles.unitSwitcher}>
      <button
        className={classNames(styles.unitSwitcherItem, {
          [styles.isActive]: value === "celsius",
        })}
        onClick={() => onChange("celsius")}
      >
        °C
      </button>
      <div className={styles.unitSwitcherSeparator} />
      <button
        className={classNames(styles.unitSwitcherItem, {
          [styles.isActive]: value === "fahrenheit",
        })}
        onClick={() => onChange("fahrenheit")}
      >
        °F
      </button>
    </div>
  );
}
