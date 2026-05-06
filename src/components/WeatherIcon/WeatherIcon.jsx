import styles from "./WeatherIcon.module.css";
import sunnyRaw from "../../assets/weather/sunny.svg?raw";
import nightSunnyRaw from "../../assets/weather/night-sunny.svg?raw";
import rainyRaw from "../../assets/weather/rainy.svg?raw";
import showerRaw from "../../assets/weather/shower.svg?raw";
import thunderRaw from "../../assets/weather/thunder.svg?raw";
import thunderstormRaw from "../../assets/weather/thunderstorm.svg?raw";
import mostlyCloudyRaw from "../../assets/weather/mostly-cloudy.svg?raw";
import sunnyCloudyRaw from "../../assets/weather/sunny-cloudy.svg?raw";
import sunnyMostlyCloudyRaw from "../../assets/weather/sunny-mostly-cloudy.svg?raw";
import nightRainyRaw from "../../assets/weather/night-rainy.svg?raw";
import nightRaw from "../../assets/weather/night.svg?raw";
import nightCloudyRaw from "../../assets/weather/night-cloudy.svg?raw";

/**
 * Figma 92×92 frame, clip contents off — `<img>` clips filters; inline SVG does not.
 * Asset `width`/`height` on files are Figma export bounds, not the layout slot.
 */
const WEATHER_SVG = {
  sunny: sunnyRaw,
  "night-sunny": nightSunnyRaw,
  rainy: rainyRaw,
  shower: showerRaw,
  thunder: thunderRaw,
  thunderstorm: thunderstormRaw,
  "mostly-cloudy": mostlyCloudyRaw,
  "sunny-cloudy": sunnyCloudyRaw,
  "sunny-mostly-cloudy": sunnyMostlyCloudyRaw,
  "night-rainy": nightRainyRaw,
  night: nightRaw,
  "night-cloudy": nightCloudyRaw,
};

/** @param {string} svg */
function ensureRootSvgOverflowVisible(svg) {
  if (/<svg[^>]*\boverflow\s*=\s*["']visible["']/i.test(svg)) return svg;
  return svg.replace(/<svg\b/i, '<svg overflow="visible"');
}

export function WeatherIcon({ type = "sunny", className }) {
  const raw = WEATHER_SVG[type];
  if (!raw) throw new Error(`Unknown weather type: ${type}`);

  const markup = ensureRootSvgOverflowVisible(raw);

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-weather={type}>
      <span className={styles.svgHost} aria-hidden dangerouslySetInnerHTML={{ __html: markup }} />
    </div>
  );
}
