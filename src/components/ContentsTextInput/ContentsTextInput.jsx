import styles from "./ContentsTextInput.module.css";

export function ContentsTextInput({
  state = "default",
  placeholder = "전시 후기를 남겨주세요.",
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
      <textarea
        className={["typo-heading-sm", styles.textarea].join(" ")}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
}

