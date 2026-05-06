import styles from "./Button.module.css";

export function Button({ children, disabled, className, onClick, variant = "cta", type = "button" }) {
  const isLink = variant === "link";

  const rootClass = [
    styles.root,
    isLink ? styles.link : styles.cta,
    !isLink && (disabled ? styles.ctaDisabled : styles.ctaAble),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const labelClass = isLink
    ? ["typo-component-body", styles.labelLink].filter(Boolean).join(" ")
    : ["typo-heading", styles.labelCta].filter(Boolean).join(" ");

  return (
    <button
      className={rootClass}
      disabled={!isLink && disabled}
      type={type}
      onClick={onClick}
    >
      <span className={labelClass}>{children}</span>
    </button>
  );
}
