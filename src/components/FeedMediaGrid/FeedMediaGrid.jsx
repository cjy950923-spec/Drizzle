import { useEffect, useMemo, useRef, useState } from "react";
import { PictureTile } from "../PictureTile/PictureTile.jsx";
import styles from "./FeedMediaGrid.module.css";

const VARIANT_SIZE = {
  "1-1": { w: 1, h: 1 },
  "4-5": { w: 4, h: 5 },
  "2-3": { w: 2, h: 3 },
  "16-9": { w: 16, h: 9 },
};

const FEED_GAP = 16;
const THREE_COLUMN_BASE_TILE_WIDTH = 164;

export function FeedMediaGrid({ posts, onPostClick, className }) {
  const feedRef = useRef(null);
  const [feedWidth, setFeedWidth] = useState(344);

  useEffect(() => {
    const node = feedRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setFeedWidth(entry.contentRect.width);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const minWidthForThreeColumns =
    THREE_COLUMN_BASE_TILE_WIDTH * 3 + FEED_GAP * 2;
  const columnCount = feedWidth >= minWidthForThreeColumns ? 3 : 2;
  const columnWidth = Math.max(
    1,
    (feedWidth - FEED_GAP * (columnCount - 1)) / columnCount,
  );

  const columns = useMemo(() => {
    const next = Array.from({ length: columnCount }, () => ({
      height: 0,
      items: [],
    }));

    posts.forEach((post) => {
      const ratio = VARIANT_SIZE[post.variant] ?? VARIANT_SIZE["1-1"];
      const tileHeight = Math.round((columnWidth * ratio.h) / ratio.w);

      let targetColumnIndex = 0;
      for (let i = 1; i < next.length; i += 1) {
        if (next[i].height < next[targetColumnIndex].height) {
          targetColumnIndex = i;
        }
      }

      next[targetColumnIndex].items.push({
        ...post,
        width: Math.round(columnWidth),
        height: tileHeight,
      });
      next[targetColumnIndex].height += tileHeight + FEED_GAP;
    });

    return next.map((column) => column.items);
  }, [columnCount, columnWidth, posts]);

  return (
    <section
      className={[styles.photoFeed, className].filter(Boolean).join(" ")}
      ref={feedRef}
      aria-label="전시 피드 게시물"
    >
      {columns.map((column, columnIndex) => (
        <div className={styles.feedColumn} key={`col-${columnIndex}`}>
          {column.map((post) => (
            <button
              key={post.id}
              type="button"
              className={styles.tileButton}
              onClick={() => onPostClick?.(post.id)}
            >
              <PictureTile
                variant={post.variant}
                width={post.width}
                height={post.height}
              />
            </button>
          ))}
        </div>
      ))}
    </section>
  );
}
