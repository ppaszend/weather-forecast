import { ICity } from "@/interfaces";
import { useState } from "react";
import styles from "./styles.module.css";

interface IProps {
  citySearchQuery: string;
  setCitySearchQuery(query: string): void;
  results: ICity[];
  setSelectedCity(city: ICity): void;
  selectedCity: ICity | undefined;
}

function cityLabel(city: ICity) {
  return `${city.name}, ${city.country}`;
}

export default function UiSearchInput({
  citySearchQuery,
  setCitySearchQuery,
  results,
  setSelectedCity,
  selectedCity,
}: IProps) {
  const [isFocused, setIsFocused] = useState(false);

  function onResultClicked(city: ICity) {
    setSelectedCity(city);
    setCitySearchQuery(cityLabel(city));
    setIsFocused(false);
  }

  return (
    <div
      className={[styles.wrapper, isFocused && styles.isFocused].join(" ")}
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        value={
          isFocused || !selectedCity ? citySearchQuery : cityLabel(selectedCity)
        }
        onChange={(e) => setCitySearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.hintsContainer}>
        <div className={styles.separator} />
        {results.length === 0 && (
          <div className={styles.noResultsInfo}>
            {citySearchQuery.length < 2
              ? "Type at least 2 characters to search"
              : `No results for "${citySearchQuery}"`}
          </div>
        )}
        {results.map((city) => (
          <div
            className={styles.hint}
            key={city.id}
            onClick={() => onResultClicked(city)}
          >
            {cityLabel(city)}
          </div>
        ))}
      </div>
    </div>
  );
}
