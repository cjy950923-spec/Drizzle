import styles from "./Icon.module.css";
import { iconTokens } from "../../tokens/iconTokens.js";

export function Icon({ name, className, title }) {
  const token = iconTokens[name];
  if (!token) throw new Error(`Unknown icon token: ${name}`);

  if (token.kind === "text") {
    return (
      <span
        className={[styles.text, token.textStyleClass, className].filter(Boolean).join(" ")}
        style={{ width: token.width, height: token.height, color: token.color }}
        title={title}
      >
        {token.text}
      </span>
    );
  }

  if (token.kind === "container") {
    const c = token.container;
    const i = token.inner;
    return (
      <span
        className={[styles.container, className].filter(Boolean).join(" ")}
        style={{
          width: c.width,
          height: c.height,
          padding: c.padding,
          borderRadius: c.radius,
          background: c.background,
          border: c.border,
          boxShadow: c.boxShadow,
          backdropFilter: c.backdropFilter,
          WebkitBackdropFilter: c.webkitBackdropFilter,
        }}
        title={title}
      >
        <img
          alt=""
          className={styles.inner}
          src={i.src}
          style={{ width: i.width, height: i.height, ...i.cssVars }}
        />
      </span>
    );
  }

  return (
    <img
      alt=""
      className={[styles.glyph, className].filter(Boolean).join(" ")}
      src={token.src}
      width={token.width}
      height={token.height}
      style={token.cssVars}
      title={title}
    />
  );
}

