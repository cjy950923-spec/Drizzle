import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button.jsx";
import styles from "./Modal.module.css";

/**
 * Figma 124:579 alert-modal panel.
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {string} title
 * @param {string} [content]
 * @param {string} [cancelLabel]
 * @param {string} [confirmLabel]
 * @param {() => void} [onCancel]
 * @param {() => void} [onConfirm]
 * @param {string} [className]
 */
export function Modal({
  open,
  onClose,
  title = "Title",
  content = "Contens",
  cancelLabel = "Button",
  confirmLabel = "Button",
  onCancel,
  onConfirm,
  className,
  backdropClassName,
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const node = (
    <div
      className={[styles.backdrop, backdropClassName].filter(Boolean).join(" ")}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={[styles.panel, className].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.body}>
          <div className={styles.textGroup}>
            <p className={styles.title}>{title}</p>
            <p className={styles.content}>{content}</p>
          </div>
          <div className={styles.actions}>
            <Button
              className={[styles.actionButton, styles.actionButtonSecondary].join(
                " ",
              )}
              onClick={() => {
                onCancel?.();
                onClose?.();
              }}
            >
              {cancelLabel}
            </Button>
            <Button
              className={styles.actionButton}
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
