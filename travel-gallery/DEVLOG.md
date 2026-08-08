---

## V2 기능 정의 완료

Travel Gallery Engine V2의 최종 목표 기능을 정리하였다.

### 핵심 기능

- 사진 업로드 / 삭제 / 수정
- 갤러리
- 사진 뷰어
- 제스처
- 이미지 캐시 및 로딩
- 즐겨찾기
- 메모
- 위치 정보
- EXIF 정보
- 슬라이드쇼
- 다운로드
- 공유

### 제외하기로 결정한 기능

- 검색 기능
- 이름순 정렬
- 최근 업로드 정렬

현재 프로젝트 범위에서는 구현하지 않는다.

---

## 설계 방향 확정

V2는 기능 구현보다 데이터 구조를 먼저 설계한다.

구현 순서는 다음과 같이 확정하였다.

1. Photo 데이터 모델 설계
2. State 데이터 모델 설계
3. Photo ↔ State 관계 정의
4. state.js 구현
5. photoService.js 구현
6. app.js 구현
7. gallery.js 구현
8. viewer.js 구현
9. loader.js 구현
10. gesture.js 구현
11. favorite.js 구현

---

## 핵심 설계 원칙

V2 엔진은 **Photo**를 중심으로 설계한다.

모든 기능은 하나의 Photo를 기준으로 연결된다.

Photo
├── Gallery
├── Viewer
├── Favorite
├── Memo
├── Location
├── EXIF
├── Slideshow
├── Download
└── Share

State는 Photo 자체를 저장하는 공간이 아니라,

Photo를 화면에 어떻게 표시하고 제어할지를 관리하는 역할만 담당한다.

즉,

- Photo = 데이터
- State = 현재 화면 상태

로 역할을 명확히 분리한다.

V2에서는 loader.js의 역할을 확대하였다.

기존의 단순 이미지 로딩 기능이 아니라

Travel Gallery 전체의 성능 엔진으로 설계한다.

Gallery와 Viewer는 이미지를 직접 관리하지 않으며,
모든 이미지 로딩과 캐시, 메모리 관리는 Loader가 담당한다.

성능 원칙

- 필요한 것만
- 필요한 순간에
- 필요한 만큼만

---

## State Engine 구현

### 목표

Travel Gallery V2의 상태 관리 엔진과 기본 실행 구조를 구축하였다.

### 완료

- Photo Model 설계
- State Model 설계
- State Flow 설계
- state.js 구현
- Getter / Setter API 구현
- photoService.js 기본 구조 작성
- app.js 시작점 생성

### 주요 결정 사항

- Photo는 데이터만 관리한다.
- State는 현재 화면 상태만 관리한다.
- 모든 상태 변경은 Setter API를 통해 수행한다.
- Firebase는 photoService를 통해서만 접근한다.
- app.js는 프로그램의 시작점으로 각 모듈의 실행 순서를 관리한다.

### 다음 작업

- Gallery Engine 구현

## [Gallery] Gallery 모듈 구현 완료

### 작업 목적
State에 저장된 Photo 목록을 화면에 출력하는 Gallery 모듈의 기본 구조를 구현했다.

### 구현 내용
- `renderGallery()` 구현
  - State에서 Photo 목록 조회
  - 기존 Gallery 초기화
  - Photo Card 생성 및 화면 추가

- `clearGallery()` 구현
  - 기존 Gallery 내용 제거

- `createPhotoCard()` 구현
  - Photo 객체 기반 Card 생성
  - Display Image(displayUrl) 사용
  - Lazy Loading 적용 (`loading="lazy"`)

- `appendPhotoCard()` 구현
  - 생성된 Card를 Gallery에 추가

- `refreshGallery()` 구현
  - Gallery 전체 다시 렌더링

- `initGallery()` 구현
  - Gallery 초기화 진입점 제공

### 설계 원칙
- Gallery는 화면 표시만 담당한다.
- Photo 생성 및 데이터 관리는 PhotoService가 담당한다.
- Gallery는 State만 읽고 PhotoService나 Firebase를 직접 호출하지 않는다.
- 원본 이미지는 화면에 사용하지 않고 Display Image만 출력한다.
- 많은 사진에서도 확장 가능하도록 Lazy Loading 기반 구조를 유지한다.

### 결과
Gallery 모듈의 기본 구조를 완성했다.
향후 즐겨찾기, 선택 모드, 메모, Virtual Scroll, 애니메이션 등의 기능은 현재 구조를 유지한 채 확장할 예정이다.

## Viewer Engine (예정)

- [ ] 3장 버퍼 방식 적용
- [ ] 이전/현재/다음 이미지 유지
- [ ] 프리로드(loader.js) 연동
- [ ] 슬라이드 애니메이션 최적화
- [ ] 깜박임 방지 점검

## Viewer V1 완료

### HTML
- Viewer Overlay 구조 작성
- Toolbar
- Navigation
- Information Panel
- Loading 영역

### CSS
- Viewer Overlay 스타일
- Toolbar
- Navigation
- Bottom Sheet
- Responsive 적용

### JS
- Viewer 열기/닫기
- Photo 표시
- 이전/다음 사진
- Viewer 새로고침
- Toolbar 기본 이벤트 연결
- Viewer 초기화

### 완료
Viewer 기본 구조 구현 완료.
다음 단계에서 Toolbar 기능(다운로드, 공유, 즐겨찾기, 정보, 삭제)과 Gesture, Viewer Engine을 구현 예정.

## Gallery V1 완료

### HTML
- Gallery Grid
- Empty 화면
- Loading 화면

### CSS
- Gallery Grid 레이아웃
- Photo Card
- Photo Image
- Photo Overlay
- Empty Gallery
- Gallery Loading
- Responsive 적용

### JS
- Gallery 렌더링
- Photo Card 생성
- Viewer 연결
- Gallery 렌더링 구조 정리

### 완료
Gallery 기본 구조 구현 완료.
Viewer와 연동 가능한 상태.
다음 단계에서 Gallery 동작 확인 및 Viewer Toolbar 기능을 구현 예정.