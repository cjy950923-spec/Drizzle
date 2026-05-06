import styles from "./PictureTile.module.css";
import placeholderIconUrl from "../../assets/icon-picture-placeholder.svg";

/** Figma 12:4270 Picture feed — 고정 프레임; 사진만 표시 (Photo Add와 별도) */
const VARIANT_LAYOUT = {
  "1-1": { width: 164, height: 164, placeholderClass: "" },
  "16-9": { width: 163, height: 92, placeholderClass: styles.placeholderShiftX },
  "2-3": { width: 163, height: 244, placeholderClass: styles.placeholderShiftX },
  "4-5": { width: 164, height: 205, placeholderClass: styles.placeholderShiftY },
};

export function PictureTile({
  variant = "1-1",
  width,
  height,
  className,
  imageUrl,
}) {
  const preset = VARIANT_LAYOUT[variant] ?? VARIANT_LAYOUT["1-1"];
  const w = width ?? preset.width;
  const h = height ?? preset.height;

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={{
        width: w,
        height: h,
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
      }}
    >
      {!imageUrl && (
        <img
          alt=""
          className={[styles.placeholder, preset.placeholderClass].filter(Boolean).join(" ")}
          src={placeholderIconUrl}
        />
      )}
    </div>
  );
}
