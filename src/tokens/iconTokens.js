import iconLocateUrl from "../assets/icons/icon-locate.svg";
import iconCloseUrl from "../assets/icons/icon-close.svg";
import iconSearchUrl from "../assets/icons/icon-search.svg";
import iconArrowLeftUrl from "../assets/icons/icon-arrow-left.svg";
import iconHomeUrl from "../assets/icons/icon-home.svg";
import iconFeedUrl from "../assets/icons/icon-feed.svg";
import iconReviewUrl from "../assets/icons/icon-review.svg";

/**
 * 아이콘 토큰: 다른 컴포넌트에서 아이콘을 종속 없이 재사용하기 위한 레지스트리.
 * - `kind: "glyph"`: 단독 아이콘 (img)
 * - `kind: "container"`: 배경/패딩 포함 아이콘 (예: Arrow_Left, Review)
 * - `kind: "text"`: 아이콘 섹션에 포함된 텍스트 토큰 (더보기)
 */
export const iconTokens = {
  locate: {
    kind: "glyph",
    name: "Locate",
    src: iconLocateUrl,
    width: 16,
    height: 16,
    cssVars: { "--stroke-0": "var(--color-icon-locate-stroke)" },
  },
  close: {
    kind: "container",
    name: "Close",
    container: {
      width: 24,
      height: 24,
    },
    inner: {
      src: iconCloseUrl,
      width: 13.801,
      height: 13.801,
      cssVars: { "--fill-0": "var(--color-icon-default)" },
    },
  },
  search: {
    kind: "glyph",
    name: "Search",
    src: iconSearchUrl,
    width: 20,
    height: 20,
    cssVars: { "--fill-0": "var(--color-icon-muted)" },
  },
  home: {
    kind: "glyph",
    name: "Home",
    src: iconHomeUrl,
    width: 24,
    height: 24,
    cssVars: { "--fill-0": "var(--color-icon-light)" },
  },
  feed: {
    kind: "glyph",
    name: "Feed",
    src: iconFeedUrl,
    width: 24,
    height: 24,
    cssVars: { "--fill-0": "var(--color-icon-light)" },
  },
  review: {
    kind: "container",
    name: "Review",
    container: {
      width: 42,
      height: 42,
      padding: 9,
      radius: 8,
      background: "var(--color-gray-01)",
    },
    inner: {
      src: iconReviewUrl,
      width: 24,
      height: 24,
      cssVars: { "--fill-0": "var(--color-icon-muted)" },
    },
  },
  arrowLeft: {
    kind: "container",
    name: "Arrow_Left",
    container: {
      width: 38,
      height: 38,
      radius: 100,
      background: "var(--icon-arrow-left-bg)",
      border: "1px solid var(--icon-arrow-left-border)",
      boxShadow: "var(--icon-arrow-left-shadow)",
      backdropFilter: "blur(var(--icon-arrow-left-blur))",
      webkitBackdropFilter: "blur(var(--icon-arrow-left-blur))",
    },
    inner: {
      src: iconArrowLeftUrl,
      width: 8,
      height: 16,
      cssVars: { "--stroke-0": "var(--color-icon-default)" },
    },
  },
  moreText: {
    kind: "text",
    name: "더보기",
    width: 32,
    height: 18,
    textStyleClass: "typo-body-sm",
    color: "var(--color-icon-more-text)",
    text: "더보기",
  },
};

