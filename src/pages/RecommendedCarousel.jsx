import { useCallback, useEffect, useRef } from "react";
import styles from "./RecommendedCarousel.module.css";

/**
 * 가로 캐러셀: 터치/트랙패드 자연 스크롤 + 웹에서 마우스 드래그·세로 휠로 좌우 이동.
 * 카드 단위 스냅 없음.
 */
export function RecommendedCarousel({ children }) {
  const ref = useRef(null);
  const drag = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e) => {
      const mostlyVertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      if (!mostlyVertical) return;
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add(styles.dragging);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!drag.current.active || e.pointerId !== drag.current.pointerId) return;
    const el = ref.current;
    if (!el) return;
    el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX);
  }, []);

  const endDrag = useCallback((e) => {
    const el = ref.current;
    if (drag.current.active && e.pointerId === drag.current.pointerId) {
      if (el?.hasPointerCapture?.(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
    }
    drag.current.active = false;
    drag.current.pointerId = null;
    el?.classList.remove(styles.dragging);
  }, []);

  const onLostPointerCapture = useCallback(() => {
    drag.current.active = false;
    drag.current.pointerId = null;
    ref.current?.classList.remove(styles.dragging);
  }, []);

  return (
    <div
      ref={ref}
      className={styles.root}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={onLostPointerCapture}
    >
      {children}
    </div>
  );
}
