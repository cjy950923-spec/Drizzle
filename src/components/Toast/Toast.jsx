import styles from "./Toast.module.css";

/** Figma 122:764 — Gray_06 pill, 14 Medium Pretendard, white text */
export function Toast({
  children = "Text Section",
  className,
  role = "status",
  ariaLive = "polite",
}) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-component="toast"
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
    >
      <p className={styles.label}>{children}</p>
    </div>
  );
}
