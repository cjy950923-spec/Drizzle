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

/** Figma 날씨 메인 아이콘 레이아웃 슬롯(px). 루트 viewBox는 이 정사각에 맞춤. */
const SLOT = 92;
const SLOT_C = SLOT / 2;

/**
 * Figma 92×92 레이아웃 슬롯 + 인라인 SVG(필터는 `<img>`보다 안전).
 * - Export 파일의 viewBox는 Figma가 잡은 **비정사각 바운딩**(예: 181×172)인 경우가 많아,
 *   브라우저 기본 meet만 쓰면 92×92 안에 **여백만 생기고 그림이 작아** 보입니다.
 * - 루트는 항상 `viewBox="0 0 92 92"`(시안과 동일한 레이아웃 좌표)로 두고,
 *   원본 좌표계는 `<g transform="…">` 한 번으로만 스케일합니다. `<defs>`는 밖에 두어 id·필터를 유지합니다.
 * - 그림자·블러는 `overflow="visible"`로 슬롯 밖으로 그려져 다른 레이어와 겹칠 수 있습니다.
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

/** @param {string} attrs opening `<svg` attribute string (no brackets) */
function rebuildSvgOpen(attrs) {
  const cleaned = attrs
    .replace(/\s*viewBox\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\s*width\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\s*height\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\s*preserveAspectRatio\s*=\s*["'][^"']*["']/gi, "")
    .replace(/\s*overflow\s*=\s*["'][^"']*["']/gi, "");
  return `<svg${cleaned} viewBox="0 0 ${SLOT} ${SLOT}" overflow="visible"`;
}

/**
 * 원본 viewBox(0 0 W H) 좌표를 시안과 동일한 92×92 슬롯에 맞춤.
 * 균일 스케일은 max(W,H) 기준(= slice와 동일)으로 슬롯을 가득 채우고, 필터는 defs 쪽 그대로 둠.
 */
function prepareWeatherSvgMarkup(svg) {
  const trimmed = svg.trim();
  const head = trimmed.match(/^<svg([^>]*)>/i);
  if (!head) return trimmed;

  const vbMatch = trimmed.match(/viewBox=["']\s*0\s+0\s+([\d.]+)\s+([\d.]+)\s*["']/i);
  if (!vbMatch) return trimmed;

  const W = parseFloat(vbMatch[1]);
  const H = parseFloat(vbMatch[2]);
  if (!(W > 0 && H > 0)) return trimmed;

  const closeStart = trimmed.lastIndexOf("</svg>");
  if (closeStart < 0) return trimmed;

  const defsMatch = trimmed.match(/<defs\b/i);
  const defsIdx = defsMatch ? defsMatch.index : -1;

  const openLen = head[0].length;
  const innerEnd = defsIdx >= 0 ? defsIdx : closeStart;
  const inner = trimmed.slice(openLen, innerEnd);
  const tail = defsIdx >= 0 ? trimmed.slice(defsIdx) : trimmed.slice(closeStart);

  const almostSlot = (n) => Math.abs(n - SLOT) < 0.001;

  let body;
  if (almostSlot(W) && almostSlot(H)) {
    body = inner;
  } else {
    const cx = W / 2;
    const cy = H / 2;
    const s = Math.max(SLOT / W, SLOT / H);
    body = `<g transform="translate(${SLOT_C},${SLOT_C}) scale(${s}) translate(${-cx},${-cy})">${inner}</g>`;
  }

  return `${rebuildSvgOpen(head[1])}>${body}${tail}`;
}

export function WeatherIcon({ type = "sunny", className }) {
  const raw = WEATHER_SVG[type];
  if (!raw) throw new Error(`Unknown weather type: ${type}`);

  const markup = prepareWeatherSvgMarkup(raw);

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-weather={type}>
      <span className={styles.svgHost} aria-hidden dangerouslySetInnerHTML={{ __html: markup }} />
    </div>
  );
}
