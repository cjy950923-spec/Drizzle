import styles from "./PhotoAdd.module.css";
import iconCameraUrl from "../../assets/icon-camera.svg";

export function PhotoAdd({ label = "+ 사진 올리기", className, onClick }) {
  return (
    <button
      className={[styles.root, className].filter(Boolean).join(" ")}
      type="button"
      onClick={onClick}
    >
      <div className={styles.inner}>
        <img alt="" className={styles.icon} src={iconCameraUrl} />
        <span className={styles.label}>{label}</span>
      </div>
    </button>
  );
}

