import styles from "./RecommendedExhibitCard.module.css";

export function RecommendedExhibitCard({
  title,
  location,
  imageUrl,
  className,
}) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div className={styles.image} style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined} />
      <div className={styles.meta}>
        <p className={styles.metaTitle}>{title}</p>
        <p className={styles.metaSub}>{location}</p>
      </div>
    </div>
  );
}
