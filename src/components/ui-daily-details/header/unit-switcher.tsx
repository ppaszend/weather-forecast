import styles from "./styles.module.css";
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
        className={[
          styles.unitSwitcherItem,
          value === "celsius" && styles.isActive,
        ].join(" ")}
        onClick={() => onChange("celsius")}
      >
        °C
      </button>
      <div className={styles.unitSwitcherSeparator} />
      <button
        className={[
          styles.unitSwitcherItem,
          value === "fahrenheit" && styles.isActive,
        ].join(" ")}
        onClick={() => onChange("fahrenheit")}
      >
        °F
      </button>
    </div>
  );
}
