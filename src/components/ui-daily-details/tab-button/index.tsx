import classNames from "classnames";
import styles from "./styles.module.css";

interface ITabButtonProps {
  isActive: boolean;
  onClick(): void;
  text: string;
}

export default function TabButton({
  isActive,
  text,
  onClick,
}: ITabButtonProps) {
  return (
    <button
      className={classNames(styles.tab, { [styles.isActive]: isActive })}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
