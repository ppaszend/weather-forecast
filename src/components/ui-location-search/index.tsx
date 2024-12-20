import { ILocation } from "@/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCoordsFromBrowserLocation } from "@/helpers";
import styles from "./styles.module.css";
import { useCitySearch } from "@/hooks";
import { getLocationFromCoordinates, getLocationFromIpAddress } from "@/api";
import Results from "./results";
import SearchInput from "./search-input";
import classNames from "classnames";

interface IProps {
  location?: ILocation;
  onLocationChange(coordinates: ILocation): void;
}

export default function UiLocationSearch({
  location,
  onLocationChange,
}: IProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { results } = useCitySearch({ searchQuery });
  const searchInputRef = useRef<HTMLInputElement>(null);

  const localizeByIpAddress = useCallback(() => {
    getLocationFromIpAddress().then((location) => {
      onLocationChange(location);
      setSearchQuery(location.label);
    });
  }, [onLocationChange]);

  const localizeByBrowser = useCallback(() => {
    getCoordsFromBrowserLocation()
      .then(getLocationFromCoordinates)
      .then((location) => {
        onLocationChange(location);
        setSearchQuery(location.label);
        setIsFocused(false);
        searchInputRef.current?.blur();
      });
  }, [onLocationChange]);

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(({ state }) => {
      if (state === "granted") {
        localizeByBrowser();
      } else {
        localizeByIpAddress();
      }
    });
  }, [localizeByBrowser, localizeByIpAddress]);

  function onResultClicked(location: ILocation) {
    onLocationChange(location);
    setSearchQuery(location.label);
    setIsFocused(false);
  }

  return (
    <div
      className={classNames(styles.wrapper, { [styles.isFocused]: isFocused })}
      tabIndex={0}
      onFocus={() => {
        setIsFocused(true);
        searchInputRef.current?.focus();
      }}
      onBlur={() => setIsFocused(false)}
    >
      <SearchInput
        ref={searchInputRef}
        value={isFocused || !location ? searchQuery : location.label}
        onChange={setSearchQuery}
        onLocalizeMe={localizeByBrowser}
      />
      <Results
        results={results}
        searchQuery={searchQuery}
        onResultClicked={onResultClicked}
      />
    </div>
  );
}
