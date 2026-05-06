import styles from "./SubWeatherIcon.module.css";
import humidity1Url from "../../assets/weather/sub/humidity-1.svg";
import humidity2Url from "../../assets/weather/sub/humidity-2.svg";
import fastWind1Url from "../../assets/weather/sub/fast-wind-1.svg";
import fastWind2Url from "../../assets/weather/sub/fast-wind-2.svg";
import fastWind3Url from "../../assets/weather/sub/fast-wind-3.svg";
import fastWind4Url from "../../assets/weather/sub/fast-wind-4.svg";

/** @typedef {"humidity" | "fast-wind"} SubWeatherIconType */

export const SUB_WEATHER_ICON_TYPES = /** @type {const} */ (["humidity", "fast-wind"]);

/** Figma 16:5486 Sub Weather — `humidity` | `fast-wind` */
export function SubWeatherIcon({ type = "humidity", className }) {
  if (type === "humidity") {
    return (
      <div
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-sub-weather="humidity"
        aria-hidden
      >
        <div className={styles.humidityLayer1Wrap}>
          <div className={styles.humidityLayer1Inner}>
            <img alt="" className={styles.vector} src={humidity1Url} />
          </div>
        </div>
        <div className={styles.humidityLayer2Wrap}>
          <div className={styles.humidityLayer2Inner}>
            <img alt="" className={styles.vector} src={humidity2Url} />
          </div>
        </div>
      </div>
    );
  }

  if (type === "fast-wind") {
    return (
      <div
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-sub-weather="fast-wind"
        aria-hidden
      >
        <div className={styles.fastWindLayer1Wrap}>
          <div className={styles.fastWindLayer1Inner}>
            <img alt="" className={styles.vector} src={fastWind1Url} />
          </div>
        </div>
        <div className={styles.fastWindLayer2Wrap}>
          <div className={styles.fastWindLayer2Inner}>
            <img alt="" className={styles.vector} src={fastWind2Url} />
          </div>
        </div>
        <div className={styles.fastWindLayer3Wrap}>
          <div className={styles.fastWindLayer3Inner}>
            <img alt="" className={styles.vector} src={fastWind3Url} />
          </div>
        </div>
        <div className={styles.fastWindLayer4Wrap}>
          <div className={styles.fastWindLayer4Inner}>
            <img alt="" className={styles.vector} src={fastWind4Url} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
