import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/Button/Button.jsx";
import { FeedMediaGrid } from "../components/FeedMediaGrid/FeedMediaGrid.jsx";
import { Icon } from "../components/Icon/Icon.jsx";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import { PictureTile } from "../components/PictureTile/PictureTile.jsx";
import { Toast } from "../components/Toast/Toast.jsx";
import styles from "./ExhibitFeedDetailPage.module.css";

const COLLAPSED_CONTENT_LENGTH = 86;

export function ExhibitFeedDetailPage({
  posts,
  selectedPostId,
  transientPost,
  onSelectPost,
  onBackToFeed,
  onNavigateHome,
  onNavigateFeed,
  onNavigateReviewCreate,
  toastMessage,
  toastSignal,
}) {
  const heroRef = useRef(null);
  const scrollRef = useRef(null);
  const switchTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const toastFadeTimeoutRef = useRef(null);
  const toastHideTimeoutRef = useRef(null);
  const [heroWidth, setHeroWidth] = useState(375);
  const [expanded, setExpanded] = useState(false);
  const [isSwitchingPost, setIsSwitchingPost] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastFading, setToastFading] = useState(false);

  const scrollToTopEverywhere = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "auto" });
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    if (typeof document !== "undefined") {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  const currentPost = useMemo(() => {
    if (selectedPostId === transientPost?.id) return transientPost;
    return posts.find((post) => post.id === selectedPostId) ?? posts[0];
  }, [posts, selectedPostId, transientPost]);

  useEffect(() => {
    setExpanded(false);
  }, [currentPost?.id]);

  useEffect(
    () => () => {
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (toastFadeTimeoutRef.current) {
        clearTimeout(toastFadeTimeoutRef.current);
      }
      if (toastHideTimeoutRef.current) {
        clearTimeout(toastHideTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!toastSignal || !toastMessage) return;

    setShowToast(true);
    setToastFading(false);

    if (toastFadeTimeoutRef.current) {
      clearTimeout(toastFadeTimeoutRef.current);
    }
    if (toastHideTimeoutRef.current) {
      clearTimeout(toastHideTimeoutRef.current);
    }

    toastFadeTimeoutRef.current = setTimeout(() => {
      setToastFading(true);
      toastFadeTimeoutRef.current = null;
    }, 1500);

    toastHideTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
      setToastFading(false);
      toastHideTimeoutRef.current = null;
    }, 1800);
  }, [toastMessage, toastSignal]);

  const handleSelectRelatedPost = (postId) => {
    if (!postId || postId === currentPost?.id) return;

    setIsSwitchingPost(true);

    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current);
    }
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    switchTimeoutRef.current = setTimeout(() => {
      onSelectPost(postId);
      switchTimeoutRef.current = null;
    }, 90);

    scrollTimeoutRef.current = setTimeout(() => {
      scrollToTopEverywhere();
      setIsSwitchingPost(false);
      scrollTimeoutRef.current = null;
    }, 140);
  };

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setHeroWidth(entry.contentRect.width);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const content = currentPost?.content ?? "";
  const hasMore = content.length > COLLAPSED_CONTENT_LENGTH;
  const visibleContent =
    expanded || !hasMore
      ? content
      : `${content.slice(0, COLLAPSED_CONTENT_LENGTH).trimEnd()}...`;

  return (
    <div className={styles.viewport}>
      <div className={styles.shell}>
        <header className={styles.headerShell}>
          <div className={styles.headerInner}>
            <button
              type="button"
              className={styles.backButton}
              onClick={onBackToFeed}
              aria-label="피드로 돌아가기"
            >
              <Icon name="arrowLeft" />
            </button>
          </div>
        </header>

        <main
          className={styles.scroll}
          aria-label="전시 피드 상세"
          ref={scrollRef}
        >
          {isSwitchingPost && <div className={styles.flashOverlay} aria-hidden />}
          <section ref={heroRef} className={styles.heroSection}>
            <PictureTile
              variant="1-1"
              width={Math.max(1, Math.round(heroWidth))}
              height={Math.max(1, Math.round(heroWidth))}
              imageUrl={currentPost?.imageUrl}
            />
          </section>

          <section className={styles.contentSection}>
            <h1 className={styles.title}>{currentPost?.title}</h1>

            <p className={styles.body}>
              {visibleContent}
              {hasMore && (
                <button
                  type="button"
                  className={styles.moreButton}
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  {expanded ? "접기" : <Icon name="moreText" />}
                </button>
              )}
            </p>

            <Button variant="link" className={styles.linkButton}>
              사이트 방문
            </Button>
          </section>

          <section className={styles.feedSection}>
            <FeedMediaGrid
              posts={posts}
              onPostClick={handleSelectRelatedPost}
            />
          </section>
        </main>

        {showToast ? (
          <div
            className={[
              styles.toastAnchor,
              toastFading ? styles.toastFading : null,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden
          >
            <Toast>{toastMessage}</Toast>
          </div>
        ) : null}

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
