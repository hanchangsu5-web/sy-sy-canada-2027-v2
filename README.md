# SY & SY Canada 2027

> A family travel guide and travel memory service for our Canada trip.

---

# 프로젝트 소개

**SY & SY Canada 2027**은 가족 캐나다 여행을 위한 웹 프로젝트입니다.

프로젝트는 두 가지 목적을 가지고 개발됩니다.

- **V1** : 여행 중 필요한 정보를 제공하는 여행 가이드
- **V2** : Firebase 기반 가족 여행 기록 서비스

여행 준비부터 여행 기록, 사진 관리, 지도, 여행 앨범까지
하나의 서비스에서 사용할 수 있도록 개발하고 있습니다.

---

# 프로젝트 구조

```
sy-sy-canada-2027
│
├── images/                 # 공통 이미지
├── templates/              # 공통 템플릿
├── tools/                  # 여행 도구
│   ├── budget/
│   ├── english/
│   ├── map/
│   ├── restaurants/
│   └── tracking/
│
├── voucher/                # 바우처
│
├── test/                   # 기능 테스트
├── photos/                 # Firebase 사진 서비스
├── favorite/               # 즐겨찾기 사진
│
├── day1.html ~ day8.html
├── checklist.html
├── booking.html
├── expense.html
├── flight.html
├── rentalcar.html
├── index.html
│
├── firebase.js
├── style.css
├── script.js
│
├── README.md
├── VISION.md
├── PROJECT.md
└── google-mymaps-links.md
```

---

# 문서 안내

| 문서 | 설명 |
|------|------|
| **README.md** | 프로젝트 소개 및 구조 |
| **VISION.md** | 프로젝트 목표와 핵심 철학 |
| **PROJECT.md** | 개발 현황 및 작업 기록 |
| **google-mymaps-links.md** | Google My Maps 링크 관리 |

---

# 개발 환경

- HTML5
- CSS3
- JavaScript (ES Modules)
- Firebase Firestore
- Firebase Storage
- Google Maps
- OpenStreetMap Reverse Geocoding
- EXIF Reader

---

# 현재 구현 기능

## V1

- 여행 일정(Day1 ~ Day8)
- 체크리스트
- 여행 지도
- 맛집 안내
- 바우처 관리

### V2

#### Firebase

- Firestore
- Storage

#### 사진

- 사진 업로드
- EXIF 정보 추출
- GPS 저장
- 대표 장소 자동 인식
- 날짜순 갤러리

#### 사진 뷰어

- 사진 스와이프
- 핀치 줌
- 사진 카운터
- Preload(미리 로딩)
- showPhoto() 공통 함수
- 즐겨찾기
- 확대 중 스와이프 방지

#### 메모

- 메모 작성
- 메모 수정

---

# 개발 원칙

- 새로운 기능은 **test 프로젝트**에서 먼저 검증한다.
- 공통 기능은 함수와 모듈로 재사용한다.
- 기존 프로젝트 구조를 최대한 유지한다.
- 모바일 환경을 우선으로 개발한다.
- 새로운 파일이나 폴더가 추가되면 README 구조를 함께 갱신한다.

---

# 작업 흐름

```
기능 설계

↓

test 프로젝트 개발

↓

기능 검증

↓

메인 프로젝트 적용

↓

PROJECT.md 기록

↓

Git Commit
```

---

# 라이선스

개인 학습 및 가족 여행 프로젝트


## Gallery Engine V2 시작

### 배경

기존 gallery.js는 기능 추가와 테스트를 반복하면서
구조가 복잡해졌고, V3 개발 이후 다음 문제가 발생하였다.

- 확대 시 간헐적인 깜박임
- 하트 버튼 반응 지연
- 유지보수 어려움
- 성능 개선의 한계

여러 차례 디버깅을 진행하였지만,
단순 버그 수정이 아닌 구조 개선이 필요하다고 판단하였다.

### 결정 사항

기존 코드는 백업으로 보관한다.

새로운 Gallery Engine V2를 별도 구조에서 개발한다.

### 목표

- 유지보수가 쉬운 구조
- 역할이 명확한 파일 분리
- 삼성 갤러리와 유사한 UX
- 300장 이상의 사진도 고려한 설계
- 기능보다 엔진을 먼저 개발


앞으로는 매일 작업을 마칠 때마다,

DEVLOG.md에 오늘 작업 요약
ARCHITECTURE.md에 설계 변경이 있었다면 반영
다음 작업 한 가지를 명확히 기록