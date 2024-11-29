import { useImperativeHandle, useRef, forwardRef, ForwardedRef } from "react";
import styles from "./styles.module.css";

const geolocationAvailable = "geolocation" in navigator;

interface IProps {
  value: string;
  onChange(value: string): void;
  onLocalizeMe(): void;
}

interface ITest {
  focus(): void;
  blur(): void;
}

function SearchInput(
  { value, onChange, onLocalizeMe }: IProps,
  ref: ForwardedRef<ITest>,
) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    blur() {
      inputRef.current?.blur();
    },
  }));

  return (
    <div className={styles.searchInputWrapper}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
        placeholder="Type city name..."
      />
      {geolocationAvailable && (
        <button className={styles.searchButton} onClick={onLocalizeMe}>
          <img src="/assets/icons/my-location.svg" />
        </button>
      )}
      <button
        className={styles.searchButton}
        onClick={() => {
          onChange("");
          inputRef.current?.focus();
        }}
      >
        <img src="/assets/icons/close.svg" />
      </button>
    </div>
  );
}

export default forwardRef<ITest, IProps>(SearchInput);
