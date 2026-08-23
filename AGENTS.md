<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 이 저장소는 "사무직 이력서 사이트 템플릿"입니다

사용자는 이 템플릿을 클론해서 **자신의 이력서 사이트**로 바꾸려는 사람입니다. 에이전트의 역할은 사용자의 이력 정보를 아래 두 데이터 파일에 옮겨 넣는 것이지, 사이트를 다시 설계하는 것이 아닙니다.

## 수정하는 곳 / 수정하지 않는 곳

| 수정 O | 수정 X (구조 변경 금지) |
|---|---|
| `src/data/resume.ts` — 프로필·성과·역량·경력·학력·자격·스킬·활동·연락 | `src/components/*` — 레이아웃·스타일 |
| `src/data/tools.ts` — AI 업무툴 항목 | `src/app/globals.css` — 디자인 토큰 |
| `public/profile.svg` → 본인 사진 (`/profile.jpg` 등, 정사각형) | `src/app/page.tsx`, `src/app/tools/[slug]/page.tsx` |
| `public/tools/<slug>/` → 본인 툴 스크린샷 (16:10 권장) | `src/lib/*` (카테고리 라벨 `CATEGORY_LABELS`만 예외) |
| `src/app/icon.svg` — 파비콘 이니셜 두 글자 | |

섹션을 빼고 싶으면 데이터 배열을 비우지 말고 사용자에게 확인한 뒤 `src/app/page.tsx`에서 해당 `<Section>` 블록과 `nav` 항목을 함께 제거하세요.

## 디자인 규칙 (참조 사이트와 동일하게 유지)

- 무채색 팔레트 고정. **사이트 UI에 색을 추가하지 않습니다.** `--color-point`는 데모 스크린샷 SVG 내부 전용입니다.
- 애니메이션은 최초 로드 `fade-in` 하나뿐. 스크롤 애니메이션·3D·파티클 금지.
- 라이브러리 추가 금지 (next, react, tailwindcss, pretendard 외).
- 타이포·여백·헤어라인 어휘를 그대로 씁니다: 모노스페이스 라벨, `border-line` 헤어라인, `font-[620]` 제목, `text-muted` 보조 텍스트.
- 본문 16px 이상, 명도 대비 4.5:1 이상 유지.

## 콘텐츠 규칙 (PRD §9)

1. 성과에는 가능한 범위에서 수치·빈도·기간·처리 범위를 넣습니다. 수치가 없으면 **사용자에게 되묻습니다.** 지어내지 않습니다.
2. 불릿은 결과를 먼저, 행동과 근거를 뒤에: `Bullet = { result, action }` 타입이 이를 강제합니다.
3. 날짜는 `YYYY.MM`, 목록은 최신순.
4. 회사·고객 정보는 익명화합니다. (`중견 제조업체 A사`)
5. 면접에서 근거를 설명할 수 없는 과장은 쓰지 않습니다.
6. AI 업무툴은 **개발 기술 자랑이 아니라 업무 문제 해결의 증거**로 씁니다. `problem → result → features(≤3) → safeguards → stack/duration → outcomes/liveUrl` 순서를 지킵니다.

## 개인정보 체크리스트 (PRD §6) — 공개 전 반드시 확인

- [ ] 휴대전화 번호, 생년월일, 성별, 상세 주소, 주민등록번호, 계좌번호 없음
- [ ] 가족관계, 재산, 혼인 여부, 현재 연봉 없음
- [ ] 상세 주소 대신 `profile.location`에 근무 가능 지역만
- [ ] 스크린샷의 실명·고객정보·회사 내부정보 마스킹, 실제 업무 데이터는 데모 데이터로 교체
- [ ] `liveUrl` 데모에는 가상 데이터만

빠른 확인: `grep -nE "01[0-9]-?[0-9]{3,4}-?[0-9]{4}|생년|주민" src/data/*.ts` 결과가 없어야 합니다.

## 검증

```bash
npm run lint && npm run build
```

- 데스크톱(1280px)·모바일(375px)에서 앵커 이동, 툴 카드 → 상세 페이지, 스크린샷 확대, 이메일 복사 확인
- 브라우저 인쇄(Cmd/Ctrl+P) 미리보기에서 레이아웃이 깨지지 않는지 확인 — "PDF 저장" 버튼이 이 기능을 엽니다

## Next 16 주의

- `params`는 `Promise` — 항상 `await params`.
- `next lint`는 없습니다. `npm run lint` = `eslint`.
- `next/image`에 `.svg`를 쓰면 자동 `unoptimized`. 사진(jpg/png)으로 바꾸면 그대로 최적화됩니다.
