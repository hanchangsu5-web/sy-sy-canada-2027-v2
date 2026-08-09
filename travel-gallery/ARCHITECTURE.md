# Travel Gallery V2 Architecture

---

# 1. 프로젝트 목표

Travel Gallery V2는 사진을 단순히 저장하는 프로그램이 아니라,

많은 사진(수천~수만 장)을 빠르고 안정적으로 관리할 수 있는 사진 관리 엔진을 목표로 한다.

V2는 기능 중심 개발이 아니라 구조 중심 개발을 원칙으로 한다.

---

# 2. 개발 원칙

## 2.1 책임 분리 (Single Responsibility)

각 파일과 함수는 하나의 역할만 담당한다.

예)

- state.js → 상태 관리
- photoService.js → Photo 데이터 생성 및 관리
- gallery.js → Gallery 화면 출력
- viewer.js → 사진 보기

기능이 추가되어도 기존 파일의 역할은 변경하지 않는다.

---

## 2.2 데이터 중심 설계

모든 기능은 Photo 데이터를 기준으로 동작한다.

```
Photo

↓

State

↓

Gallery
Viewer
Search
Favorite
Map
Slide Show
```

Photo 하나만 변경하면 모든 화면에 동일하게 반영되는 구조를 목표로 한다.

---

## 2.3 구조 우선 개발

기능을 먼저 만들지 않는다.

항상

```
설계

↓

구조

↓

기능
```

순서로 개발한다.

---

# 3. 프로젝트 구조

```
travel-gallery/

├── css/
│   ├── common.css
│   ├── gallery.css
│   ├── viewer.css
│   ├── upload.css
│   └── map.css
│
├── js/
│   ├── app.js
│   ├── state.js
│   ├── config.js
│   │
│   ├── services/
│   │   ├── photoService.js
│   │   ├── uploadService.js
│   │   ├── firebaseService.js
│   │   └── imageService.js
│   │
│   ├── gallery/
│   │   ├── gallery.js
│   │   ├── galleryEvents.js
│   │   └── galleryRender.js
│   │
│   ├── viewer/
│   │   ├── viewer.js
│   │   ├── slideShow.js
│   │   └── zoom.js
│   │
│   ├── upload/
│   │   ├── upload.js
│   │   ├── dropzone.js
│   │   └── imageResize.js
│   │
│   ├── map/
│   │   ├── map.js
│   │   └── marker.js
│   │
│   └── utils/
│       ├── dom.js
│       ├── date.js
│       └── file.js
│
├── images/
├── index.html
└── README.md
```

※ 현재 구현되지 않은 파일도 포함한다.
구조를 먼저 설계하고 이후 기능을 채워 넣는다.

---

# 4. Data Models

## 4.1 Photo Model

```javascript
{
    photoId: "",

    mediaType: "image",

    displayUrl: "",
    originalUrl: "",

    width: 0,
    height: 0,

    fileSize: 0,
    fileName: "",

    createdAt: "",
    updatedAt: "",

    favorite: false,

    location: null
}
```

### 설계 원칙

- photoId를 유일한 식별자로 사용한다.
- 파일명은 참고 정보일 뿐이다.
- 모든 기능은 Photo 객체를 기준으로 동작한다.

---

## 4.2 State Model

State는 프로그램의 현재 상태를 저장한다.

예)

- Photo 목록
- 현재 선택된 사진
- 정렬 방식
- 보기 방식
- 슬라이드 상태

State는 UI를 직접 수정하지 않는다.

---

## 4.3 Config

프로젝트에서 사용하는 공통 설정값을 관리한다.

예)

```
DISPLAY_MAX_SIZE
DISPLAY_QUALITY
CACHE_SIZE
LAZY_LOAD_DISTANCE
```

---

# 5. Image Strategy

## 목표

사용자가 화질 저하를 느끼지 않는 범위에서 가장 빠르게 동작하는 것을 목표로 한다.

---

## Original Image

사용

- 보관
- 다운로드
- 공유

---

## Display Image

사용

- Gallery
- Viewer
- Slide Show
- Pinch Zoom

생성 기준

- 긴 변 2560px
- JPEG 품질 85%

---

## 핵심 원칙

사용자가 보는 모든 화면은 Display Image를 사용한다.

Original은 저장 및 다운로드 용도로만 사용한다.

---

# 6. State Flow

```
App

↓

PhotoService

↓

State

↓

Gallery

↓

Viewer
```

모든 화면은 State를 기준으로 동작한다.

---

# 7. Gallery Engine

Gallery는 화면 출력만 담당한다.

```
renderGallery()

↓

clearGallery()

↓

createPhotoCard()

↓

appendPhotoCard()
```

Gallery는 데이터를 직접 수정하지 않는다.

---

# 8. Viewer Engine

Viewer는 현재 선택된 Photo를 표시한다.

향후

- Pinch Zoom
- Slide Show
- 전체 화면

기능을 담당한다.


---

### Viewer 설계 원칙

- Viewer는 최초 한 번만 생성한다.
- Viewer DOM은 삭제하지 않는다.
- 화면 변경 시 DOM을 재생성하지 않고 내용만 갱신한다.
- Viewer는 Photo 객체를 저장하지 않고 `currentPhotoId`만 관리한다.
- 필요한 Photo 정보는 항상 State를 통해 조회한다.
- 모든 화면 갱신은 `showPhoto()`를 통해 수행한다.
- 다른 함수는 화면을 직접 수정하지 않고 상태(State)만 변경한다.
- 즐겨찾기 변경은 State를 먼저 갱신하고 화면을 즉시 변경한다.
- Firebase 저장은 백그라운드에서 처리하여 UI 반응 속도를 유지한다.

### Viewer State

Viewer는 별도의 전역변수를 사용하지 않고 State를 통해 상태를 관리한다.

viewer
- isOpen
- currentPhotoId
- zoom
- rotation
- translateX
- translateY

설계 원칙
- Viewer는 Photo 객체를 저장하지 않는다.
- Viewer는 currentPhotoId만 관리한다.
- Photo 정보가 필요하면 항상 State에서 조회한다.
- Viewer DOM은 한 번만 생성하며 삭제하지 않는다.
- 상태(State)가 변경되면 Viewer의 DOM 내용만 갱신한다.

---

# 9. Upload Engine

Upload는

- Drag & Drop
- 이미지 압축
- Display Image 생성
- Firebase 업로드

를 담당한다.

---

# 10. Performance Strategy

대량의 사진에서도 자연스럽게 동작하는 것을 목표로 한다.

적용 예정

- Lazy Loading
- Virtual Scroll
- Display Image
- Cache
- RequestAnimationFrame

---

# 11. 개발 규칙

- Photo는 photoId로 관리한다.
- 함수 하나는 하나의 역할만 가진다.
- 화면은 State를 직접 수정하지 않는다.
- 공통 설정은 config.js에서 관리한다.
- 새로운 기능은 기존 구조를 변경하지 않고 확장한다.

---

# 12. 향후 추가 예정

- Search Engine
- Favorite Engine
- Map Engine
- AI 기능
- 얼굴 인식
- 중복 사진 검사
- 클라우드 동기화

### Gallery Rendering

- 화면에 보이는 이미지와 주변 이미지만 로드한다.
- 화면에서 멀어진 이미지는 메모리에서 해제한다.
- DOM은 유지하고 이미지 리소스만 관리한다.