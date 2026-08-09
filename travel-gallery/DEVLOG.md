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

# 2026-08-08

## Firebase 연동 완료

### Firebase

- Firebase 프로젝트 생성
- Web App 등록
- Cloud Firestore 생성
- Firebase Storage 생성

### 업로드 기능

- uploadPhoto() 구현
- Firebase Storage 업로드
- Download URL 생성
- Firestore 메타데이터 저장

### 사진 불러오기

- loadPhotos() 구현
- Firestore photos 컬렉션 조회
- createdAt 내림차순 정렬
- Photo 배열 생성
- state.setPhotos() 연동

### Gallery

- 앱 시작 시 loadPhotos() 실행
- Firestore 데이터를 Gallery와 연결
- Firebase에 저장된 사진이 Gallery에 정상 표시됨

### 수정 사항

- gallery.html CSS 경로 수정
- gallery.html app.js 경로 수정
- loadPhotos() 중복 선언 제거
- initApp() 호출 추가

### 확인 완료

- ✅ 사진 업로드
- ✅ Firebase Storage 저장
- ✅ Firestore 메타데이터 저장
- ✅ Firestore 조회
- ✅ State 저장
- ✅ Gallery 렌더링

---

## 다음 작업

- width / height 저장
- Viewer 연결
- 사진 클릭 이벤트
- 이전 / 다음 이동
- 메모 표시
- 즐겨찾기 기능
- 삭제 기능
- 정렬 기능
- 세로 사진 UI 개선

# 2026-08-09 개발 내용

## Viewer
- 즐겨찾기 토글 기능 리팩토링
- Viewer에서 즐겨찾기 해제 시 Gallery와 즉시 동기화
- 즐겨찾기 화면에서 즐겨찾기 해제하면 해당 사진이 즉시 목록에서 제거되도록 개선
- Viewer ↔ Gallery 상태 동기화 구조 개선

## Gallery
- 촬영일 기준 그룹 정렬 개선
- 날짜 구분선 디자인을 심플하게 변경
- 즐겨찾기 필터와 사람별 필터를 동시에 사용할 수 있도록 개선 (AND 조건)
- 사람별 정렬 기능 추가
- 첫 즐겨찾기 클릭 시 발생하던 지연 현상 일부 개선

## Upload
- 마지막 선택한 작성자를 localStorage에 저장
- 업로드 화면 진입 시 마지막 작성자를 자동 선택
- 업로드 완료 후에도 작성자 선택 유지
- 사진 선택 UI 개선
  - 브라우저 기본 File Input UI 제거
  - 사용자 정의 '📁 사진 선택' 버튼 적용
  - 선택 사진 개수 표시(📷 n장 선택됨) 추가
- 업로드 화면 UI 개선
  - 제목 및 버튼 문구 개선
  - 카드 스타일 및 여백 개선
  - 메인 업로드 버튼 스타일 개선
  - 파일 선택 버튼 스타일 개선

## 기타
- exifr 적용 중 남아있던 import 및 CDN 참조 제거
- upload.js 이벤트 연결 오류 수정
- handleFileSelection 이벤트 연결 구조 정리

## 다음 작업
- 지도(Map) 기능 구현 시작
- EXIF 자동 추출 기능 추가
- 공통 UI(Common CSS) 정리

# 개발 로드맵 (확정)

현재 Gallery, Viewer, Upload의 기본 기능은 완료되었으며,
남은 작업은 아래 우선순위에 따라 진행한다.

---

## 1. Gallery 성능 최적화 (최우선)

목표
- 여행 사진 500장 이상에서도 부드럽게 동작하는 Gallery 구현

구현 내용
- IntersectionObserver 기반 Lazy Loading
- 화면 근처의 이미지만 로드
- 화면에서 멀어진 이미지는 메모리에서 해제
- 이미지 캐시 관리
- 필요 시 requestAnimationFrame을 이용한 스크롤 최적화

※ Virtual Scroll은 실제 500장 테스트 후 필요 여부를 결정한다.

---

## 2. Viewer 완성

Viewer를 모바일 표준 UX에 맞게 개선한다.

구현 내용
- 더블탭 확대/축소
- 두 손가락 Pinch Zoom
- 확대 상태에서 한 손가락 이동(Pan)
- 일반 상태에서 좌우 Swipe
- 제스처 충돌 방지

Viewer는 현재 구조(State 기반)를 유지하며 기능만 확장한다.

---

## 3. Slide Show

Viewer 내부 기능으로 구현한다.

구현 내용
- 자동 재생
- 재생/일시정지
- 일정 시간 간격 사진 전환
- 터치 시 슬라이드쇼 제어

---

## 4. EXIF GPS

현재 촬영일은 이미 구현되어 있으므로
GPS 정보만 추가로 읽는다.

구현 내용
- GPS Latitude
- GPS Longitude
- Firestore 저장

---

## 5. Google Maps 연동

별도의 Map 화면은 만들지 않는다.

Viewer에서

[🗺️ Google 지도 보기]

버튼을 제공하고

저장된 GPS 좌표를 이용하여
Google Maps를 새 탭(또는 앱)으로 연다.

---

## 6. Common CSS 정리

프로젝트 마무리 단계에서 공통 스타일을 정리한다.

대상
- Button
- Input
- Select
- Textarea
- Card
- Modal

중복 스타일을 제거하고
공통 클래스로 통합한다.

---

## 개발 원칙

- 기존 아키텍처를 최대한 유지한다.
- Photo 객체를 중심으로 모든 기능을 확장한다.
- Viewer는 하나만 생성하여 재사용한다.
- Gallery는 Viewer를 호출만 하고 직접 제어하지 않는다.
- 기능보다 구조를 우선한다.
- 새로운 기능은 기존 구조를 변경하지 않고 확장한다.

## 현재 버전에서 제외

- Drag & Drop 업로드
- 업로드 진행률 표시
- 검색 기능
- 별도 Map 화면
- Photo 객체 리팩터링(필요 시 재검토)
- Virtual Scroll(500장 테스트 후 필요 시 검토)