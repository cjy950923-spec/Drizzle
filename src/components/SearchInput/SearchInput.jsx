import styles from "./SearchInput.module.css";
import iconSearchUrl from "../../assets/icon-search.svg";

export function SearchInput({
  state = "default",
  placeholder = "전시를 검색해 주세요.",
  value,
  onChange,
  className,
}) {
  const isPressed = state === "pressed";
  return (
    <label
      className={[styles.root, isPressed ? styles.pressed : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      <img alt="" className={styles.icon} src={iconSearchUrl} />
      <input
        className={["typo-heading-sm", styles.input].join(" ")}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
}

