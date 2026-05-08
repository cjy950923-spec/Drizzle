import { useState } from "react";
import { ComingSoonExhibitCard } from "../components/ComingSoonExhibitCard/ComingSoonExhibitCard.jsx";
import { Icon } from "../components/Icon/Icon.jsx";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import { NewExhibitCard } from "../components/NewExhibitCard/NewExhibitCard.jsx";
import { RecommendedExhibitCard } from "../components/RecommendedExhibitCard/RecommendedExhibitCard.jsx";
import { SubWeatherIcon } from "../components/SubWeatherIcon/SubWeatherIcon.jsx";
import { WeatherIcon } from "../components/WeatherIcon/WeatherIcon.jsx";
import { BannerInfoModal } from "../components/BannerInfoModal/BannerInfoModal.jsx";
import { RecommendedCarousel } from "./RecommendedCarousel.jsx";
import styles from "./DrizzleHome.module.css";

import posterSomyeolUrl from "../assets/exhibit-posters/poster-somyeol.png";
import posterDamienHirstUrl from "../assets/exhibit-posters/poster-damien-hirst.png";
import posterMmcaKoreanModernUrl from "../assets/exhibit-posters/poster-mmca-korean-modern.png";
import posterGeuraedoUrl from "../assets/exhibit-posters/poster-geuraedo.png";
import posterStorageRenewalUrl from "../assets/exhibit-posters/poster-storage-renewal.png";
import posterMmcaAcademySeason2Url from "../assets/exhibit-posters/poster-mmca-academy-season2.png";
import posterArtAndLunch2026Url from "../assets/exhibit-posters/poster-art-and-lunch-2026.png";
import posterSeniorWalkUrl from "../assets/exhibit-posters/poster-senior-walk.png";
import poster1945KorJpnUrl from "../assets/exhibit-posters/poster-1945-kor-jpn.png";
import posterConceptArtUrl from "../assets/exhibit-posters/poster-concept-art.png";
import posterFiveSensesUrl from "../assets/exhibit-posters/poster-five-senses.png";

const RECOMMENDED = [
  {
    id: "rec-1",
    title: "소멸의 시학: 삭는 미술에 대하여",
    location: "국립현대미술관",
    imageUrl: posterSomyeolUrl,
  },
  {
    id: "rec-2",
    title: "데이미언 허스트",
    location: "국립현대미술관",
    imageUrl: posterDamienHirstUrl,
  },
  {
    id: "rec-3",
    title: "한국의 미술: 조선에서 현대까지",
    location: "국립중앙박물관",
    imageUrl: posterMmcaKoreanModernUrl,
  },
  {
    id: "rec-4",
    title: "빛의 조각: 미디어 아트 특별전",
    location: "DDP 뮤지엄",
    imageUrl: posterGeuraedoUrl,
  },
  {
    id: "rec-5",
    title: "도시와 자연: 사진으로 보는 서울",
    location: "서울시립미술관",
    imageUrl: posterStorageRenewalUrl,
  },
];

const NEW_EXHIBITS = [
  {
    id: "new-1",
    title: "MMCA 아카데미 시즌 2: 한국미술의 실험, 현실, 혼성",
    place: "서울 다원공간",
    period: "2026-04-15 ~ 2026-06-24",
    category: "교육",
    imageUrl: posterMmcaAcademySeason2Url,
  },
  {
    id: "new-2",
    title: "2026 아트앤런치: 일상 속 예술, 그리고 예술가",
    place: "서울 열린교육공간+",
    period: "2026-04-08 ~ 2026-06-10",
    category: "전시",
    imageUrl: posterArtAndLunch2026Url,
  },
  {
    id: "new-3",
    title: "시니어와 함께하는 ‹미술관 한걸음›",
    place: "서울 1층, 로비",
    period: "2026-03-17 ~ 2026-11-20",
    category: "교육",
    imageUrl: posterSeniorWalkUrl,
  },
];

const COMING_SOON = [
  {
    id: "cs-1",
    title: "1945년 이후 한·일 미술",
    location: "과천 1층, 1, 2 전시실, 중앙홀 및 조각공원",
    dDayText: "D-5",
    imageUrl: poster1945KorJpnUrl,
  },
  {
    id: "cs-2",
    title: "이것은 개념미술이 (아니)다",
    location: "서울 지하1층, 6, 7전시실, 지하1층, 전시마당",
    dDayText: "D-5",
    imageUrl: posterConceptArtUrl,
  },
  {
    id: "cs-3",
    title: "오~감각미술관",
    location: "어린이미술관",
    dDayText: "D-5",
    imageUrl: posterFiveSensesUrl,
  },
];

/** Figma 88:298 — Drizzle 메인 (상단 Main BG, 날씨↔콘텐츠 구분선 없음·60px 간격) */
export function DrizzleHome({
  onNavigateHome,
  onNavigateFeed,
  onNavigateReviewCreate,
}) {
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const weekdayLabel = new Date().toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  return (
    <div className={styles.viewport}>
      <div className={styles.shell}>
        <div className={styles.gradient} aria-hidden />

        <button
          type="button"
          className={styles.topBanner}
          aria-label="상단 배너"
          onClick={() => setBannerModalOpen(true)}
        >
          <p className={styles.topBannerText}>
            Drizzle App 기능을 경험해 볼 수 있는 데모용 페이지입니다.
          </p>
        </button>

        <main className={styles.scroll}>
          <div className={styles.stack}>
            <section className={styles.weatherSection} aria-label="오늘 날씨">
              <div className={styles.weatherMetaRow}>
                <p className={styles.weekday}>{weekdayLabel}</p>
                <div className={styles.location}>
                  <Icon name="locate" />
                  <p className={styles.locationText}>
                    서울시 강남구
                  </p>
                </div>
              </div>

              <div className={styles.weatherHeroRow}>
                <div className={styles.tempBlock}>
                  <p className={styles.tempLine}>
                    <span className={styles.tempDigit}>18</span>
                    <span className={styles.tempDegree}>°</span>
                    <span className={styles.tempUnit}>C</span>
                  </p>
                  <p className={styles.weatherMessage}>
                    오늘은 야외 전시를
                    <br />
                    보기 좋은 날이에요!
                  </p>
                </div>

                <div className={styles.weatherVisual}>
                  <WeatherIcon type="sunny-cloudy" />
                  <div className={styles.subWeatherRow}>
                    <div className={styles.subMetric}>
                      <SubWeatherIcon type="humidity" />
                      <p className={styles.subMetricText}>
                        45%
                      </p>
                    </div>
                    <div className={styles.subMetric}>
                      <SubWeatherIcon type="fast-wind" />
                      <p className={styles.subMetricText}>
                        10 m/s
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className={styles.sectionStack}>
              <section
                className={styles.section}
                aria-labelledby="sec-recommended"
              >
                <h2 id="sec-recommended" className={styles.recommendedTitle}>
                  오늘 날씨에 추천 전시
                </h2>
                <RecommendedCarousel>
                  {RECOMMENDED.map((item) => (
                    <RecommendedExhibitCard
                      key={item.id}
                      title={item.title}
                      location={item.location}
                      imageUrl={item.imageUrl}
                    />
                  ))}
                </RecommendedCarousel>
              </section>

              <hr className={styles.stackDivider} aria-hidden />

              <section className={styles.section} aria-labelledby="sec-new">
                <h2 id="sec-new" className={styles.sectionHeading}>
                  새로운 전시
                </h2>
                <div className={styles.newList}>
                  {NEW_EXHIBITS.map((item) => (
                    <div key={item.id} className={styles.newListRow}>
                      <NewExhibitCard
                        title={item.title}
                        place={item.place}
                        period={item.period}
                        category={item.category}
                        imageUrl={item.imageUrl}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <hr className={styles.stackDivider} aria-hidden />

              <section className={styles.section} aria-labelledby="sec-coming">
                <h2 id="sec-coming" className={styles.sectionHeading}>
                  곧 오픈예정 전시
                </h2>
                <div className={styles.comingList}>
                  {COMING_SOON.map((item) => (
                    <ComingSoonExhibitCard
                      key={item.id}
                      title={item.title}
                      location={item.location}
                      dDayText={item.dDayText}
                      imageUrl={item.imageUrl}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        <div className={styles.navShell}>
          <div className={styles.navShellInner}>
            <NavigationBar
              variant="fill"
              active="home"
              onHomeClick={onNavigateHome}
              onReviewClick={onNavigateReviewCreate}
              onFeedClick={onNavigateFeed}
            />
          </div>
        </div>

        <BannerInfoModal
          open={bannerModalOpen}
          onClose={() => setBannerModalOpen(false)}
        />
      </div>
    </div>
  );
}
