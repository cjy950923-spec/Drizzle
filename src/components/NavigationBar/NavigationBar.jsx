import styles from "./NavigationBar.module.css";

function IconHome({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 23.4996" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M10.7998 0.4C11.5109 -0.133333 12.4891 -0.133333 13.2002 0.4L23.2002 7.9C23.7036 8.27765 23.9999 8.87028 24 9.49961V22.4996C24 23.0519 23.5523 23.4996 23 23.4996H16V14.4996C15.9998 13.9475 15.5522 13.4996 15 13.4996H9C8.44783 13.4996 8.00019 13.9475 8 14.4996V23.4996H1C0.447715 23.4996 0 23.0519 0 22.4996V9.49961C0.000107815 8.87028 0.296374 8.27765 0.799805 7.9L10.7998 0.4Z"
      />
    </svg>
  );
}

function IconFeed({ className }) {
  return (
    <svg className={className} viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M11.5 0C12.6046 0 13.5 0.895431 13.5 2H21C22.1046 2 23 2.89543 23 4V16C23 17.1046 22.1046 18 21 18H15.7168L17.8477 21.6914C18.2619 22.4088 18.0163 23.326 17.2988 23.7402C16.5814 24.1543 15.6642 23.9088 15.25 23.1914L13 19.2939V22.5C13 23.3284 12.3284 24 11.5 24C10.6716 24 10 23.3284 10 22.5V19.4629L7.84766 23.1914C7.43338 23.9087 6.51619 24.1544 5.79883 23.7402C5.08158 23.326 4.83587 22.4088 5.25 21.6914L7.38086 18H2C0.895431 18 0 17.1046 0 16V4C0 2.89543 0.895431 2 2 2H9.5C9.5 0.895431 10.3954 0 11.5 0Z"
      />
    </svg>
  );
}

function IconReview({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M12 0C13.1046 0 14 0.895431 14 2V10H22C23.1046 10 24 10.8954 24 12C24 13.1046 23.1046 14 22 14H14V22C14 23.1046 13.1046 24 12 24C10.8954 24 10 23.1046 10 22V14H2C0.895431 14 5.18688e-07 13.1046 0 12C4.82823e-08 10.8954 0.895431 10 2 10H10V2C10 0.895431 10.8954 0 12 0Z"
      />
    </svg>
  );
}

export function NavigationBar({
  active,
  className,
  onHomeClick,
  onReviewClick,
  onFeedClick,
  variant = "pill",
}) {
  const homeActive = active === "home";
  const feedActive = active === "feed";
  const barClass = [styles.bar, variant === "fill" ? styles.barFill : null, className].filter(Boolean).join(" ");

  return (
    <nav className={barClass} aria-label="하단 탭">
      <div className={styles.sideSlot}>
        <button
          className={styles.tab}
          type="button"
          onClick={onHomeClick}
          aria-current={homeActive ? "page" : undefined}
        >
          <span className={[styles.iconWrap, homeActive ? styles.iconWrapActive : styles.iconWrapInactive].join(" ")}>
            <IconHome className={styles.iconHome} />
          </span>
          <span className={[styles.label, homeActive ? styles.labelActive : styles.labelInactive].join(" ")}>홈</span>
        </button>
      </div>

      <button type="button" className={styles.review} onClick={onReviewClick} aria-label="리뷰 작성">
        <IconReview className={styles.reviewIcon} />
      </button>

      <div className={styles.sideSlot}>
        <button
          className={styles.tab}
          type="button"
          onClick={onFeedClick}
          aria-current={feedActive ? "page" : undefined}
        >
          <span className={[styles.iconWrap, feedActive ? styles.iconWrapActive : styles.iconWrapInactive].join(" ")}>
            <IconFeed className={styles.iconFeed} />
          </span>
          <span className={[styles.label, feedActive ? styles.labelActive : styles.labelInactive].join(" ")}>피드</span>
        </button>
      </div>
    </nav>
  );
}
