import styles from "./styles.module.css";
import { temperatureUnit } from "@/types";

export default function UnitSwitcher({
  value,
  onChange,
}: {
  value: temperatureUnit;
  onChange(unit: temperatureUnit): void;
}) {
  const units: { label: string; value: temperatureUnit }[] = [
    { label: "°C", value: "celsius" },
    { label: "°F", value: "fahrenheit" },
  ];

  return (
    <div className={styles.unitSwitcher}>
      {units.map((unit, index) => (
        <>
          {index > 0 && <div className={styles.unitSwitcherSeparator} />}
          <button
            className={[
              styles.unitSwitcherItem,
              value === unit.value && styles.isActive,
            ].join(" ")}
            onClick={() => onChange(unit.value)}
          >
            {unit.label}
          </button>
        </>
      ))}
    </div>
  );
}
