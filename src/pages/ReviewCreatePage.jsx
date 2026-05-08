import { useMemo, useState } from "react";
import { Button } from "../components/Button/Button.jsx";
import { ContentsTextInput } from "../components/ContentsTextInput/ContentsTextInput.jsx";
import { Icon } from "../components/Icon/Icon.jsx";
import { Modal } from "../components/Modal/Modal.jsx";
import { PhotoAdd } from "../components/PhotoAdd/PhotoAdd.jsx";
import { PictureTile } from "../components/PictureTile/PictureTile.jsx";
import { SearchInput } from "../components/SearchInput/SearchInput.jsx";
import styles from "./ReviewCreatePage.module.css";

const FEED_PHOTOS = Object.values(
  import.meta.glob("../assets/exhibit-feed-photos/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  }),
);

/** Figma 102:4785 — 전시 후기 등록 (미입력/입력) */
export function ReviewCreatePage({ onClose, onSubmit }) {
  const [searchValue, setSearchValue] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(undefined);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);

  const canSubmit = useMemo(
    () =>
      searchValue.trim().length > 0 &&
      reviewValue.trim().length > 0 &&
      photoAdded &&
      Boolean(photoUrl),
    [searchValue, reviewValue, photoAdded, photoUrl],
  );

  const pickRandomFeedPhoto = () => {
    if (FEED_PHOTOS.length === 0) return undefined;
    return FEED_PHOTOS[Math.floor(Math.random() * FEED_PHOTOS.length)];
  };

  return (
    <div className={styles.viewport}>
      <div className={styles.shell}>
        <header className={styles.headerSafe}>
          <div className={styles.header}>
            <h1 className={styles.title}>전시 후기 등록</h1>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setExitConfirmOpen(true)}
              aria-label="닫기"
            >
              <Icon name="close" title="닫기" />
            </button>
          </div>
        </header>

        <main className={styles.scroll} aria-label="전시 후기 작성">
          <div className={styles.container}>
            <section className={styles.section}>
              <div className={styles.fieldTitleWrap}>
                <p className={styles.fieldTitle}>전시명</p>
                <SearchInput
                  state={searchValue ? "pressed" : "default"}
                  value={searchValue}
                  onChange={setSearchValue}
                />
              </div>
              <hr className={styles.divider} aria-hidden />
            </section>

            <section className={styles.section}>
              <div className={styles.fieldTitleWrap}>
                <p className={styles.fieldTitle}>전시 후기</p>
                <ContentsTextInput
                  state={reviewValue ? "pressed" : "default"}
                  value={reviewValue}
                  onChange={setReviewValue}
                />
              </div>
              <hr className={styles.divider} aria-hidden />
            </section>

            <section className={styles.section}>
              <p className={styles.fieldTitle}>사진</p>
              {photoAdded ? (
                <button
                  type="button"
                  className={styles.photoPreviewButton}
                  onClick={() => {
                    setPhotoAdded(false);
                    setPhotoUrl(undefined);
                  }}
                  aria-label="사진 제거"
                >
                  <PictureTile
                    variant="1-1"
                    width={100}
                    height={100}
                    imageUrl={photoUrl}
                  />
                </button>
              ) : (
                <PhotoAdd
                  onClick={() => {
                    const next = pickRandomFeedPhoto();
                    if (!next) return;
                    setPhotoUrl(next);
                    setPhotoAdded(true);
                  }}
                  className={styles.photoAdd}
                />
              )}
            </section>
          </div>
        </main>

        <footer className={styles.bottomBar}>
          <div className={styles.bottomBarInner}>
            <Button
              disabled={!canSubmit}
              variant="cta"
              className={styles.submitButton}
              onClick={() =>
                onSubmit?.({
                  exhibitName: searchValue.trim(),
                  review: reviewValue.trim(),
                  photoAdded,
                  imageUrl: photoUrl,
                })
              }
            >
              등록하기
            </Button>
          </div>
        </footer>

        <Modal
          open={exitConfirmOpen}
          onClose={() => setExitConfirmOpen(false)}
          backdropClassName={styles.exitBackdrop}
          title="후기를 등록하지 않고 나가시겠습니까?"
          content="작성 중인 후기는 저장되지 않아요."
          cancelLabel="나가기"
          confirmLabel="작성하기"
          onCancel={onClose}
          onConfirm={() => setExitConfirmOpen(false)}
        />
      </div>
    </div>
  );
}
