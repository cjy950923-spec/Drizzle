import { useState } from "react";
import { ExhibitFeedPage } from "./pages/ExhibitFeedPage.jsx";
import { ExhibitFeedDetailPage } from "./pages/ExhibitFeedDetailPage.jsx";
import { DrizzleHome } from "./pages/DrizzleHome.jsx";
import { ReviewCreatePage } from "./pages/ReviewCreatePage.jsx";

const MEDIA_VARIANTS = ["1-1", "4-5", "2-3", "16-9"];
const POST_COUNT = 50;

const TITLE_POOL = [
  "국립현대미술관 소멸의시학: 삭는 미술",
  "도시의 빛과 그림자 특별전",
  "감각의 경계: 설치미술 아카이브",
  "미래 조각: 재료의 재해석",
  "서울 사진 연대기 1980-2026",
];

const CONTENT_POOL = [
  "보통 미술관이라고 하면 영원히 변하지 않는 가치를 보관하는 곳 같지만, 이번 전시는 시간의 흐름 속에서 변화하는 작업을 중심으로 구성되어 관람 동선 자체가 하나의 서사가 됩니다.",
  "작품 간 간격을 넓게 두어 시선이 머무를 여백을 만든 전시로, 조명과 사운드가 공간의 밀도를 천천히 바꿔가며 관람자가 능동적으로 의미를 조합하도록 유도합니다.",
  "기록과 기억을 주제로 한 섹션에서는 아카이브 이미지와 신작 설치가 병치되어 개인의 감정과 사회적 사건이 교차하는 순간을 섬세하게 보여줍니다.",
  "천장 구조와 바닥 재료를 적극적으로 활용한 공간 연출이 인상적이며, 동일한 작품도 보는 각도에 따라 완전히 다른 형태로 체감되도록 설계되어 있습니다.",
  "전시 후반부로 갈수록 밝기와 컬러 톤이 점진적으로 변화해 감상의 속도를 조절해 주고, 마지막 방에서는 작가 노트와 리서치 자료를 통해 맥락을 깊게 이해할 수 있습니다.",
];

function createRandomPosts(count) {
  return Array.from({ length: count }, (_, index) => {
    const title = TITLE_POOL[Math.floor(Math.random() * TITLE_POOL.length)];
    const bodyA = CONTENT_POOL[Math.floor(Math.random() * CONTENT_POOL.length)];
    const bodyB = CONTENT_POOL[Math.floor(Math.random() * CONTENT_POOL.length)];

    return {
      id: `post-${index + 1}`,
      variant:
        MEDIA_VARIANTS[Math.floor(Math.random() * MEDIA_VARIANTS.length)],
      title,
      content: `${bodyA} ${bodyB}`,
    };
  });
}

export function DrizzleApp() {
  const [screen, setScreen] = useState("home");
  const [lastScreenBeforeReview, setLastScreenBeforeReview] = useState("home");
  const [selectedPostId, setSelectedPostId] = useState("post-1");
  const [posts, setPosts] = useState(() => createRandomPosts(POST_COUNT));
  const [detailToastSignal, setDetailToastSignal] = useState(0);
  const [detailToastMessage, setDetailToastMessage] = useState("");

  const goReviewCreate = () => {
    setLastScreenBeforeReview(screen);
    setScreen("review-create");
  };

  const handleReviewSubmit = ({ exhibitName, review, imageUrl, photoAdded }) => {
    const newPostId = `post-${Date.now()}`;
    setPosts((prev) => [
      {
        id: newPostId,
        variant: "1-1",
        title: exhibitName || "전시 후기",
        content: review || "",
        imageUrl: photoAdded ? imageUrl : undefined,
      },
      ...prev,
    ]);
    setSelectedPostId(newPostId);
    setDetailToastMessage("전시 후기가 등록되었습니다");
    setDetailToastSignal((prev) => prev + 1);
    setScreen("feed-detail");
  };

  if (screen === "feed") {
    return (
      <ExhibitFeedPage
        posts={posts}
        onSelectPost={(postId) => {
          setSelectedPostId(postId);
          setScreen("feed-detail");
        }}
        onNavigateHome={() => setScreen("home")}
        onNavigateFeed={() => setScreen("feed")}
        onNavigateReviewCreate={goReviewCreate}
      />
    );
  }

  if (screen === "feed-detail") {
    return (
      <ExhibitFeedDetailPage
        posts={posts}
        selectedPostId={selectedPostId}
        onSelectPost={(postId) => {
          setSelectedPostId(postId);
          setScreen("feed-detail");
        }}
        onBackToFeed={() => setScreen("feed")}
        onNavigateHome={() => setScreen("home")}
        onNavigateFeed={() => setScreen("feed")}
        onNavigateReviewCreate={goReviewCreate}
        toastMessage={detailToastMessage}
        toastSignal={detailToastSignal}
      />
    );
  }

  if (screen === "review-create") {
    return (
      <ReviewCreatePage
        onClose={() => setScreen(lastScreenBeforeReview)}
        onSubmit={handleReviewSubmit}
      />
    );
  }

  return (
    <DrizzleHome
      onNavigateHome={() => setScreen("home")}
      onNavigateFeed={() => setScreen("feed")}
      onNavigateReviewCreate={goReviewCreate}
    />
  );
}
