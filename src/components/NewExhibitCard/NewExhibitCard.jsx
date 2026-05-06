import { CategoryBadge } from "../CategoryBadge/CategoryBadge.jsx";
import styles from "./NewExhibitCard.module.css";

export function NewExhibitCard({
  title,
  place,
  period,
  category,
  imageUrl,
  className,
}) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div className={styles.image} style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined} />

      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.detailsBlock}>
          <div className={styles.details}>
            <p className={styles.detailsLine}>{place}</p>
            <p className={styles.detailsLine}>{period}</p>
          </div>
        </div>
        <CategoryBadge label={category} variant="border" />
      </div>
    </div>
  );
}
