## design-tokens

Figma 노드 `102:4765` (Style)에서 추출한 **color + typography 토큰**입니다.

### CSS 변수로 쓰기

- `design-tokens/tokens.css`: 변수 정의
- `design-tokens/typography.css`: 변수 기반 타이포 유틸 클래스

예시:

```css
@import "./design-tokens/tokens.css";
@import "./design-tokens/typography.css";

.card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-02);
  color: var(--color-text-default);
}
```

```html
<h1 class="typo-title-strong">Title Strong</h1>
<p class="typo-body-base">Body Base</p>
```

### TS로 값 참조하기

`design-tokens/tokens.ts`에서 `colors`, `typography`를 import해서 사용할 수 있습니다.

