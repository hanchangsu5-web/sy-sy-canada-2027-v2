# sy-sy-canada-2027
SY &amp; SY Canada 2027 - Our Family Adventure


# Canada Trip Guide (2027)

# 📁 프로젝트 구조

```
sy-sy-canada-2027
│
├── images/                     # 여행 사진 및 공통 이미지
│   ├── booking/
│   ├── payment/
│   ├── day1_*.jpg
│   ├── day2_*.jpg
│   └── ...
│
├── templates/                  # 공통 템플릿(추후 사용)
│
├── tools/                      # 여행 도구
│   ├── budget/                 # 예산/가계부
│   ├── english/                # 영어 회화
│   ├── map/                    # 여행 지도
│   ├── restaurants/            # 맛집
│   └── tracking/               # 트래킹
│
├── voucher/                    # 바우처 모음
│   ├── flight/
│   ├── images/
│   ├── index.html
│   └── style.css
│
├── booking.html
├── checklist.html
├── day1.html ~ day8.html       # 여행 일정
├── expense.html                # 여행 가계부
├── flight.html
├── index.html                  # 메인 페이지
├── payment.html
├── rentalcar.html
│
├── style.css                   # 공통 스타일
├── script.js                   # 공통 JavaScript
│
├── google-mymaps-links.md      # Google My Maps 링크 관리
├── PROJECT.md                  # 프로젝트 작업 기록
├── PROJECT_RULES.html          # 프로젝트 규칙
└── README.md
```

---

# 📌 프로젝트 규칙

## ChatGPT 작업 규칙

- ChatGPT는 README.md의 프로젝트 구조를 기준으로 작업한다.
- PROJECT.md의 작업 이력을 기준으로 이어서 작업한다.
- 구조가 변경되면 README.md를 먼저 업데이트한 후 작업을 진행한다.
- 기존 파일과 경로는 가능한 변경하지 않는다

## 파일 수정

- 항상 **파일명**을 먼저 알려준다.
- 수정 위치(주석 또는 제목)를 함께 안내한다.
- 필요한 코드만 보낸다.
- 기존 구조를 최대한 유지한다.

## 경로

- 현재 프로젝트 구조를 기준으로 작성한다.
- 상대경로를 사용한다.
- 새로운 폴더를 만들기 전에는 반드시 확인한다.

## 코드 작성

- 초보자가 이해하기 쉽게 설명한다.
- 한 번에 하나의 작업만 진행한다.
- 큰 수정은 단계별로 나누어 진행한다.

## 문서 관리

- 새로운 기능을 만들면 PROJECT.md에 기록한다.
- 중요한 링크는 google-mymaps-links.md에 기록한다.
- README.md는 항상 최신 프로젝트 구조를 유지한다.

## 프로젝트 구조

- 프로젝트의 폴더 및 파일 구조는 항상 README.md를 기준으로 관리한다.
- 새로운 폴더나 파일을 생성하거나 삭제하면 README.md의 프로젝트 구조도 함께 업데이트한다.
- ChatGPT는 README.md에 기록된 구조를 현재 프로젝트의 기준으로 이해하고 작업을 진행한다.

## 코드 수정 규칙

- 수정 전 항상 **파일명**을 먼저 안내한다.
- 수정 위치(주석 또는 제목)를 함께 안내한다.
- 필요한 코드만 제공한다.
- 기존 구조를 최대한 유지하며 수정한다.

## 프로젝트 문서

README.md
- 프로젝트 구조
- 폴더 및 파일 역할
- 개발 규칙

PROJECT.md
- 작업 진행 기록
- 완료한 기능
- 다음 작업 계획

google-mymaps-links.md
- Google My Maps 링크 관리

## 2026-08-05 작업 내용

### EXIF 정보 추출 기능 구현
- exifr(full.umd.js) 적용
- 휴대폰 원본 사진에서 EXIF 정보 읽기 성공
- 촬영시간(DateTimeOriginal) 저장
- GPS 위도(latitude) 저장
- GPS 경도(longitude) 저장

※ 카카오톡, 캡처본 등 EXIF가 제거된 사진은 촬영시간/GPS를 읽을 수 없음.

---

### Firestore 저장 항목 추가

photos 컬렉션 저장 구조

- family
- memo
- photoUrl
- fileName
- takenAt
- latitude
- longitude
- placeName
- createdAt

---

### 갤러리 기능 개선

사진 카드에 표시

- 작성자
- 메모
- 촬영일시

촬영일시는

YYYY.MM.DD HH:mm

형식으로 표시.

---

### 지도 보기 기능

GPS가 존재하는 사진은

'📍 지도보기'

버튼을 통해

Google Maps 좌표 화면으로 이동 가능.

GPS가 없는 사진은 버튼이 표시되지 않음.

---

### 대표 장소 자동 생성

GPS 좌표를 이용하여

Reverse Geocoding API로 대표 장소(placeName)를 자동 저장.

현재는 도시(city) 기준으로 저장되며,

세부 관광지까지 표시되지 않는 경우가 있음.

예)
탄중아루 해변
→ 코타키나발루

이 부분은 향후 개선 예정.

---

### 확인 완료

- 사진 업로드
- Firebase Storage 저장
- Firestore 저장
- EXIF 촬영시간 저장
- GPS 저장
- 지도보기
- 대표 장소 자동 저장
- 메모 수정

모두 정상 동작 확인.