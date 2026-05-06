import { useState } from "react";
import { Button } from "../components/Button/Button.jsx";
import { CategoryBadge } from "../components/CategoryBadge/CategoryBadge.jsx";
import { ComingSoonExhibitCard } from "../components/ComingSoonExhibitCard/ComingSoonExhibitCard.jsx";
import { ContentsTextInput } from "../components/ContentsTextInput/ContentsTextInput.jsx";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import { NewExhibitCard } from "../components/NewExhibitCard/NewExhibitCard.jsx";
import { PhotoAdd } from "../components/PhotoAdd/PhotoAdd.jsx";
import { PictureTile } from "../components/PictureTile/PictureTile.jsx";
import { RecommendedExhibitCard } from "../components/RecommendedExhibitCard/RecommendedExhibitCard.jsx";
import { SearchInput } from "../components/SearchInput/SearchInput.jsx";
import { SubWeatherIcon } from "../components/SubWeatherIcon/SubWeatherIcon.jsx";
import { WeatherIcon } from "../components/WeatherIcon/WeatherIcon.jsx";
import { Icon } from "../components/Icon/Icon.jsx";
import { Modal } from "../components/Modal/Modal.jsx";
import { Toast } from "../components/Toast/Toast.jsx";

export function DesignSystemPreview() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <div className="typo-title-strong">Design System Preview</div>
      <div className="typo-body-base" style={{ marginTop: 8 }}>
        이제 Figma 컴포넌트를 토큰 기반으로 구현합니다.
      </div>

      <div style={{ marginTop: 24 }} className="typo-heading">
        Alert (Toast · Modal)
      </div>
      <div className="typo-body-sm" style={{ marginTop: 8, color: "var(--color-gray-08)" }}>
        Figma 122:764 + 124:579
      </div>
      <div style={{ marginTop: 12, display: "grid", gap: 16, maxWidth: 400 }}>
        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)" }}>
          Toast
        </div>
        <Toast>Text Section</Toast>

        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)" }}>
          Modal
        </div>
        <Button type="button" onClick={() => setModalOpen(true)}>
          모달 열기
        </Button>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Title"
        content="Contens"
        cancelLabel="Button"
        confirmLabel="Button"
      />

      <div style={{ marginTop: 24 }} className="typo-heading">
        Button
      </div>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)" }}>
          CTA / State=Able
        </div>
        <Button>Button</Button>
        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)" }}>
          CTA / State=Disable
        </div>
        <Button disabled>Button</Button>
        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)" }}>
          Link Button
        </div>
        <Button variant="link">Button</Button>
      </div>

      <div style={{ marginTop: 24 }} className="typo-heading">
        Input
      </div>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)" }}>
          SearchInput / State=Default
        </div>
        <SearchInput state="default" />

        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)", marginTop: 8 }}>
          SearchInput / State=Pressed
        </div>
        <SearchInput state="pressed" value="텍스트 입력 중" />

        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)", marginTop: 8 }}>
          ContentsTextInput / State=Default
        </div>
        <ContentsTextInput state="default" />

        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)", marginTop: 8 }}>
          ContentsTextInput / State=Pressed
        </div>
        <ContentsTextInput state="pressed" value="텍스트 입력 중" />
      </div>

      <div style={{ marginTop: 24 }} className="typo-heading">
        Badge
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)" }}>
          Border
        </div>
        <CategoryBadge label="Category" variant="border" />
        <div className="typo-body-sm" style={{ color: "var(--color-gray-08)" }}>
          D-day
        </div>
        <CategoryBadge label="D-5" variant="dday" />
      </div>

      <div style={{ marginTop: 24 }} className="typo-heading">
        Navigation
      </div>
      <div style={{ display: "grid", gap: 16, marginTop: 12 }}>
        <NavigationBar active="home" />
        <NavigationBar active="feed" />
      </div>

      <div style={{ marginTop: 24 }} className="typo-heading">
        Exhibit
      </div>
      <div className="typo-body-sm" style={{ marginTop: 8, color: "var(--color-gray-08)" }}>
        Figma 102:4767 — 부가 텍스트 Gray_08 (#474747), 간격·타이포 토큰 반영
      </div>
      <div style={{ display: "grid", gap: 16, marginTop: 12, maxWidth: 360 }}>
        <RecommendedExhibitCard title="전시명" location="전시장 위치" />
        <NewExhibitCard title="전시명" place="전시 장소" period="전시 기간" category="Category" />
        <ComingSoonExhibitCard title="전시명" location="전시 장소" dDayText="D-5" />
      </div>

      <div style={{ marginTop: 24 }} className="typo-heading">
        Media
      </div>
      <div className="typo-body-sm" style={{ marginTop: 12, color: "var(--color-gray-08)" }}>
        Photo Add (Figma 93:4061)
      </div>
      <div style={{ marginTop: 8 }}>
        <PhotoAdd />
      </div>
      <div className="typo-body-sm" style={{ marginTop: 16, color: "var(--color-gray-08)" }}>
        Picture feed (Figma 12:4270)
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <PictureTile variant="1-1" />
        <PictureTile variant="4-5" />
        <PictureTile variant="2-3" />
        <PictureTile variant="16-9" />
      </div>

      <div style={{ marginTop: 24 }} className="typo-heading">
        Weather
      </div>
      <div className="typo-body-sm" style={{ marginTop: 8, color: "var(--color-gray-08)" }}>
        Main (SVG zip)
      </div>
      <div
        style={{
          marginTop: 8,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
          overflow: "visible",
        }}
      >
        <WeatherIcon type="sunny" />
        <WeatherIcon type="night-sunny" />
        <WeatherIcon type="sunny-cloudy" />
        <WeatherIcon type="sunny-mostly-cloudy" />
        <WeatherIcon type="mostly-cloudy" />
        <WeatherIcon type="rainy" />
        <WeatherIcon type="shower" />
        <WeatherIcon type="thunder" />
        <WeatherIcon type="thunderstorm" />
        <WeatherIcon type="night" />
        <WeatherIcon type="night-cloudy" />
        <WeatherIcon type="night-rainy" />
      </div>
      <div className="typo-body-sm" style={{ marginTop: 12, color: "var(--color-gray-08)" }}>
        Sub
      </div>
      <div
        style={{
          marginTop: 8,
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
          overflow: "visible",
        }}
      >
        <SubWeatherIcon type="humidity" />
        <SubWeatherIcon type="fast-wind" />
      </div>

      <div style={{ marginTop: 24 }} className="typo-heading">
        Icon
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <Icon name="locate" />
        <Icon name="close" />
        <Icon name="search" />
        <Icon name="moreText" />
        <Icon name="arrowLeft" />
        <Icon name="review" />
        <Icon name="home" />
        <Icon name="feed" />
      </div>
    </div>
  );
}

