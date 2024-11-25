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
      className={[styles.tab, isActive && styles.isActive].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
