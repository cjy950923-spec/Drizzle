import { FeedMediaGrid } from "../components/FeedMediaGrid/FeedMediaGrid.jsx";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import styles from "./ExhibitFeedPage.module.css";

/** Figma 35:4219 — 전시 피드 */
export function ExhibitFeedPage({
  posts,
  onSelectPost,
  onNavigateHome,
  onNavigateFeed,
  onNavigateReviewCreate,
}) {
  return (
    <div className={styles.viewport}>
      <div className={styles.shell}>
        <header className={styles.headerSafe}>
          <div className={styles.header}>
            <h1 className={styles.title}>전시 둘러보기</h1>
          </div>
        </header>

        <main className={styles.scroll} aria-label="전시 피드">
          <FeedMediaGrid posts={posts} onPostClick={onSelectPost} />
        </main>

        <div className={styles.navShell}>
          <div className={styles.navShellInner}>
            <NavigationBar
              variant="fill"
              active="feed"
              onHomeClick={onNavigateHome}
              onReviewClick={onNavigateReviewCreate}
              onFeedClick={onNavigateFeed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
