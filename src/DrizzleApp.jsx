import { useState } from "react";
import { ExhibitFeedPage } from "./pages/ExhibitFeedPage.jsx";
import { ExhibitFeedDetailPage } from "./pages/ExhibitFeedDetailPage.jsx";
import { DrizzleHome } from "./pages/DrizzleHome.jsx";
import { ReviewCreatePage } from "./pages/ReviewCreatePage.jsx";

const MEDIA_VARIANTS = ["1-1", "4-5", "2-3", "16-9"];
const POST_COUNT = 50;
const FEED_PHOTOS = Object.values(
  import.meta.glob("./assets/exhibit-feed-photos/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  }),
);

const REVIEW_POOL = [
  {
    title: "데미안 허스트: 진실은 없어 그러나 모든 것은 가능하지",
    content:
      "교과서에서만 보던 상어 박제를 실제로 보니 소름 돋을 정도로 압도적이었습니다. 죽음이 박제된 푸른 물속을 보고 있으면 삶의 유한함에 대해 깊이 생각하게 되네요.",
  },
  {
    title: "데미안 허스트: 진실은 없어 그러나 모든 것은 가능하지",
    content:
      "다이아몬드로 뒤덮인 해골의 눈부신 반짝임이 오히려 죽음의 공허함을 극대화하는 것 같아 기묘했어요. 자본과 예술, 그리고 생명에 대한 허스트 특유의 도발이 생생하게 느껴졌습니다.",
  },
  {
    title: "데미안 허스트: 진실은 없어 그러나 모든 것은 가능하지",
    content:
      "죽은 나비와 파리를 이용한 작품들은 시각적으로 아름다우면서도 한편으론 가슴 한구석이 서늘해지는 경험이었어요. 기괴함을 예술로 승화시키는 그의 천재성에 다시금 감탄했습니다.",
  },
  {
    title: "데미안 허스트: 진실은 없어 그러나 모든 것은 가능하지",
    content:
      "아시아 최초 대규모 회고전이라 그런지 작품의 스케일부터가 남달랐고, 배치도 아주 감각적이었어요. 난해하게만 느껴졌던 'YBA'의 정신을 조금이나마 이해할 수 있었던 알찬 전시였습니다.",
  },
  {
    title: "데미안 허스트: 진실은 없어 그러나 모든 것은 가능하지",
    content:
      "수천 개의 알약이 진열된 벽면을 보며 우리가 약에 의존해 연장하는 삶이 정말 '삶'인가 하는 의문이 들었네요. 차가운 금속 선반과 대조되는 알록달록한 약들의 배치가 매우 인상적이었습니다.",
  },
  {
    title: "데미안 허스트: 진실은 없어 그러나 모든 것은 가능하지",
    content:
      "피와 사체가 난무할 것 같은 주제임에도 불구하고, 전시장 전체를 감도는 분위기는 의외로 정적이고 경건했습니다. 공포를 미학으로 바꾸는 허스트의 연출력은 정말 독보적인 것 같아요.",
  },
  {
    title: "데미안 허스트: 진실은 없어 그러나 모든 것은 가능하지",
    content:
      "스핀 페인팅의 화려한 색감 속에 숨겨진 우연과 필연의 조화가 마치 우리 인생의 요약본 같다는 느낌을 받았습니다. 보고 나면 기가 빨릴 정도로 강렬한 에너지를 주는 전시입니다.",
  },
  {
    title: "데미안 허스트: 진실은 없어 그러나 모든 것은 가능하지",
    content:
      "공중에 떠 있는 공과 진공청소기 작품을 보며 부유하는 우리 존재의 불안정함을 느꼈습니다. 죽음을 직면하게 함으로써 역설적으로 지금 이 순간의 소중함을 일깨워주네요.",
  },
  {
    title: "삭는 미술 & 보존과학 전시 (시간의 흔적)",
    content:
      "시간이 흐르며 변색되고 부서지는 작품들을 보며, '박제된 예술'이 아닌 '살아있는 존재'로서의 미술을 느꼈습니다. 삭아가는 과정조차 작가의 의도라는 설명에 고개가 끄덕여졌어요.",
  },
  {
    title: "삭는 미술 & 보존과학 전시 (시간의 흔적)",
    content:
      "보존과학자들이 작품의 수명을 늘리기 위해 고군분투하는 과정을 보니 작품 하나하나가 더욱 소중하게 느껴지네요. 엑스레이로 본 불상 속 유물처럼 신비로운 발견이 가득했습니다.",
  },
  {
    title: "삭는 미술 & 보존과학 전시 (시간의 흔적)",
    content:
      "먼지가 쌓이고 곰팡이가 피어나는 것까지 예술의 일부로 수용하는 태도가 인상 깊었습니다. 완벽하게 보존된 것보다 서서히 사라져가는 것들이 주는 위로가 더 크다는 걸 깨달았어요.",
  },
  {
    title: "삭는 미술 & 보존과학 전시 (시간의 흔적)",
    content:
      "작품도 인간처럼 나이가 들고 병이 든다는 관점이 신선했고, 이를 치유하는 보존 전문가들의 손길이 경이로웠습니다. 현대미술의 재료가 다양해질수록 보존의 가치가 더 커지는 것 같아요.",
  },
  {
    title: "삭는 미술 & 보존과학 전시 (시간의 흔적)",
    content:
      "과거의 훼손된 부분을 복원하지 않고 그대로 두어 시간의 흐름을 보여주는 방식이 참 마음에 들었습니다. '완벽함'보다는 '진실함'을 담으려는 미술관의 노력이 돋보였던 전시였어요.",
  },
  {
    title: "로드 무비: 1945년 이후 한·일 미술",
    content:
      "해방 이후 한국과 일본 미술이 서로 어떤 영향을 주고받으며 성장했는지 한눈에 볼 수 있어 유익했습니다. 이우환 작가님의 초기작을 통해 양국 미술의 연결고리를 찾은 기분이었어요.",
  },
  {
    title: "로드 무비: 1945년 이후 한·일 미술",
    content:
      "전후 혼란기 속에서도 꺾이지 않았던 작가들의 창작욕이 작품마다 서려 있어 가슴 뭉클했습니다. 단순한 나열이 아닌, 시대적 맥락을 짚어주는 짜임새 있는 구성이 훌륭했네요.",
  },
  {
    title: "MMCA 과천 40주년 프로젝트",
    content:
      "과천관 40주년 프로젝트로 설치된 야외 조각들이 산책로와 너무 잘 어우러져 힐링 그 자체였습니다. 빛과 바람에 따라 시시각각 변하는 작품의 표정을 보는 재미가 쏠쏠했어요.",
  },
  {
    title: "MMCA 소장품 하이라이트",
    content:
      "상설전으로 열리는 하이라이트 전시에서 김환기, 박서보 등 거장들의 작품을 다시 보니 감회가 새로웠습니다. 세대를 관통하는 거장들의 아우라는 역시 직접 봐야 진가를 알 수 네요.",
  },
  {
    title: "파리의 한국 화가들 (기획전)",
    content:
      "낯선 땅 프랑스에서 한국적 정체성을 지키려 애썼던 작가들의 고뇌가 캔버스 너머로 전달되었습니다. 화려한 색채 뒤에 숨겨진 고독과 그리움이 잔잔한 여운을 남기는 전시입니다.",
  },
  {
    title: "다원예술: 프로젝트 하이라이트",
    content:
      "서울관에서 접한 미디어 아트와 퍼포먼스는 미술의 경계가 어디까지인지 다시 생각하게 만들었습니다. 관객 참여형 작품이 많아 지루할 틈 없이 오감을 만족시키는 경험이었어요.",
  },
  {
    title: "미술관 공간과 쉼",
    content:
      "전시도 좋았지만 미술관 곳곳에 마련된 라운지와 중정에서 보내는 시간 자체가 최고의 예술이었습니다. 바쁜 일상 속에서 잠시 멈춰 내면을 들여다볼 수 있는 소중한 공간입니다.",
  },
];

function createPhotoSequence({ photos, count }) {
  if (!Array.isArray(photos) || photos.length === 0 || count <= 0) return [];

  // Greedy scheduler:
  // - Prefer photos with fewer uses so far (guarantees "use all photos" before repeating when possible)
  // - Tie-break by farthest last used index to push duplicates as far apart as possible
  const lastUsedIndex = new Map(photos.map((p) => [p, -Infinity]));
  const usedCount = new Map(photos.map((p) => [p, 0]));
  const out = [];

  for (let i = 0; i < count; i += 1) {
    let best = photos[0];
    let bestUsed = usedCount.get(best) ?? 0;
    let bestLast = lastUsedIndex.get(best) ?? -Infinity;

    for (let j = 1; j < photos.length; j += 1) {
      const candidate = photos[j];
      const candidateUsed = usedCount.get(candidate) ?? 0;
      const candidateLast = lastUsedIndex.get(candidate) ?? -Infinity;

      if (candidateUsed < bestUsed) {
        best = candidate;
        bestUsed = candidateUsed;
        bestLast = candidateLast;
        continue;
      }

      if (candidateUsed === bestUsed && candidateLast < bestLast) {
        best = candidate;
        bestLast = candidateLast;
      }
    }

    out.push(best);
    usedCount.set(best, (usedCount.get(best) ?? 0) + 1);
    lastUsedIndex.set(best, i);
  }

  // Small random rotation to avoid looking "too ordered" while preserving spacing properties.
  if (out.length > 1) {
    const shift = Math.floor(Math.random() * out.length);
    if (shift > 0) out.unshift(...out.splice(out.length - shift, shift));
  }

  return out;
}

function createRandomPosts(count) {
  const photoSequence = createPhotoSequence({ photos: FEED_PHOTOS, count });

  return Array.from({ length: count }, (_, index) => {
    const review = REVIEW_POOL[Math.floor(Math.random() * REVIEW_POOL.length)];
    const imageUrl = photoSequence[index];

    return {
      id: `post-${index + 1}`,
      variant:
        MEDIA_VARIANTS[Math.floor(Math.random() * MEDIA_VARIANTS.length)],
      title: review?.title ?? "전시 후기",
      content: review?.content ?? "",
      imageUrl,
    };
  });
}

export function DrizzleApp() {
  const [screen, setScreen] = useState("home");
  const [lastScreenBeforeReview, setLastScreenBeforeReview] = useState("home");
  const [selectedPostId, setSelectedPostId] = useState("post-1");
  const [posts, setPosts] = useState(() => createRandomPosts(POST_COUNT));
  const [transientPost, setTransientPost] = useState(null);
  const [detailToastSignal, setDetailToastSignal] = useState(0);
  const [detailToastMessage, setDetailToastMessage] = useState("");

  const clearTransientPost = () => {
    setTransientPost(null);
    if (selectedPostId === "transient") {
      setSelectedPostId("post-1");
    }
  };

  const goReviewCreate = () => {
    clearTransientPost();
    setLastScreenBeforeReview(screen);
    setScreen("review-create");
  };

  const handleReviewSubmit = ({ exhibitName, review, imageUrl, photoAdded }) => {
    const nextPost = {
      id: "transient",
      variant: "1-1",
      title: exhibitName || "전시 후기",
      content: review || "",
      imageUrl: photoAdded ? imageUrl : undefined,
    };

    setTransientPost(nextPost);
    setSelectedPostId(nextPost.id);
    setDetailToastMessage("전시 후기가 등록되었습니다");
    setDetailToastSignal((prev) => prev + 1);
    setScreen("feed-detail");
  };

  if (screen === "feed") {
    return (
      <ExhibitFeedPage
        posts={posts}
        onSelectPost={(postId) => {
          clearTransientPost();
          setSelectedPostId(postId);
          setScreen("feed-detail");
        }}
        onNavigateHome={() => {
          clearTransientPost();
          setScreen("home");
        }}
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
        transientPost={transientPost}
        onSelectPost={(postId) => {
          clearTransientPost();
          setSelectedPostId(postId);
          setScreen("feed-detail");
        }}
        onBackToFeed={() => {
          clearTransientPost();
          setScreen("feed");
        }}
        onNavigateHome={() => {
          clearTransientPost();
          setScreen("home");
        }}
        onNavigateFeed={() => {
          clearTransientPost();
          setScreen("feed");
        }}
        onNavigateReviewCreate={goReviewCreate}
        toastMessage={detailToastMessage}
        toastSignal={detailToastSignal}
      />
    );
  }

  if (screen === "review-create") {
    return (
      <ReviewCreatePage
        onClose={() => {
          clearTransientPost();
          setScreen(lastScreenBeforeReview);
        }}
        onSubmit={handleReviewSubmit}
      />
    );
  }

  return (
    <DrizzleHome
      onNavigateHome={() => {
        clearTransientPost();
        setScreen("home");
      }}
      onNavigateFeed={() => {
        clearTransientPost();
        setScreen("feed");
      }}
      onNavigateReviewCreate={goReviewCreate}
    />
  );
}
