import { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "../Modal/Modal.module.css";
import styles from "./BannerInfoModal.module.css";

export function BannerInfoModal({ open, onClose }) {
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
      className={modalStyles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="알려드립니다."
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.body}>
          <div className={styles.textGroup}>
            <p className={styles.title}>알려드립니다.</p>
            <p className={styles.content}>
              안녕하세요. 뉴미디어디자인학과 최준영입니다!
              {"\n"}먼저 해당 사이트는 Drizzle App 기능을 경험해 볼 수 있는 데모용
              페이지입니다. 입력하신 데이터는 저장되지 않으며, 일부 기능이 제한될
              수 있습니다.
              {"\n\n"}그리고 제 작업물을 봐주시고 사용해주셔 너무 감사드립니다 :)
              다들 졸업 프로젝트 하시느라 고생 많으셨고 앞으로 좋을 일만 가득하길
              바랍니다.
            </p>
          </div>

          <button type="button" className={styles.confirmButton} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}

