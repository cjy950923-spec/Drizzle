import { CategoryBadge } from "../CategoryBadge/CategoryBadge.jsx";
import styles from "./ComingSoonExhibitCard.module.css";

export function ComingSoonExhibitCard({
  title,
  location,
  dDayText,
  imageUrl,
  className,
}) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div className={styles.left}>
        <div className={styles.thumb} style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined} />
        <div className={styles.meta}>
          <p className={styles.metaTitle}>{title}</p>
          <p className={styles.metaSub}>{location}</p>
        </div>
      </div>

      <div className={styles.dday}>
        <CategoryBadge variant="dday" label={dDayText} />
      </div>
    </div>
  );
}
