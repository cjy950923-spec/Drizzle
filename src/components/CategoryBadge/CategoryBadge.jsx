import styles from "./CategoryBadge.module.css";

export function CategoryBadge({ label, className, variant = "border" }) {
  const isDday = variant === "dday";

  const rootClass = [styles.root, isDday ? styles.rootDday : styles.rootBorder, className]
    .filter(Boolean)
    .join(" ");

  const labelClass = isDday ? styles.labelDday : styles.labelBorder;

  return (
    <div className={rootClass}>
      <span className={labelClass}>{label}</span>
    </div>
  );
}
