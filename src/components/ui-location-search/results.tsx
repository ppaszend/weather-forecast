import { ILocation } from "@/interfaces";
import styles from "./styles.module.css";

interface IProps {
  results: ILocation[];
  searchQuery: string;
  onResultClicked(location: ILocation): void;
}

export default function Results({
  results,
  searchQuery,
  onResultClicked,
}: IProps) {
  return (
    <div className={styles.hintsContainer}>
      <div className={styles.separator} />
      {results.length === 0 && (
        <div className={styles.noResultsInfo}>
          {searchQuery.length < 2
            ? "Type at least 2 characters to search"
            : `No results for "${searchQuery}"`}
        </div>
      )}
      {results.map((location) => (
        <div
          className={styles.hint}
          key={location.id}
          onClick={() => onResultClicked(location)}
        >
          {location.label}
        </div>
      ))}
    </div>
  );
}
