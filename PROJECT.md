# SY & SY Canada 2027 Project

## 프로젝트 개요

SY & SY Canada 2027은 가족 캐나다 여행을 위한 웹 기반 여행 서비스이다.

프로젝트는 두 단계로 개발한다.

- **V1** : 여행 가이드 (일정, 맛집, 지도, 체크리스트, 바우처)
- **V2** : Firebase 기반 여행 기록 서비스 (사진, 메모, 지도, 앨범)

---

# 프로젝트 구성

## V1 (완료)

### Day Guide

- Day1 ~ Day8 일정
- 이동 동선
- 여행 정보

### Restaurants

지역별 맛집 페이지

- Calgary
- Banff
- Granville Island
- Downtown
- English Bay

공통 구성

- 평점
- 한 줄 추천
- 대표 메뉴
- Google Maps 버튼
- 통일된 카드 디자인

### Maps

- Google My Maps Viewer 연동
- Day1 ~ Day6 지도 연결

### Checklist

여행 준비 체크리스트

### Voucher

예약 바우처 관리

---

# V2 (개발 중)

Firebase 기반 가족 여행 기록 서비스

## 완료

### Firebase

- Firebase 프로젝트 생성
- Firestore 연동
- Storage 연동
- firebase.js 구성

### 사진

- 사진 업로드
- Storage 저장
- Firestore 저장
- 갤러리 출력
- EXIF 촬영시간 저장
- GPS 좌표 저장
- 대표 장소 자동 인식
- Google Maps 연동

### 사진 뷰어

- 날짜순 정렬
- 다시 보고 싶은 사진(즐겨찾기)
- 사진 스와이프
- 사진 카운터
- 사진 미리 불러오기(Preload)
- 사진 표시 공통 함수(showPhoto)
- 핀치 줌(확대/축소)
- 확대 중 스와이프 방지

### 메모

- 메모 작성
- 메모 수정

---

# 현재 프로젝트 구조

```
V1
├── day1 ~ day8
├── restaurants
├── maps
├── checklist
└── voucher

V2
├── test
├── photos
├── favorite
└── firebase
```

---

# 개발 규칙

- 새로운 기능은 반드시 **test**에서 검증 후 메인 프로젝트에 적용한다.
- 공통 기능은 함수로 분리하여 재사용한다.
- 동일한 기능은 가능한 하나의 구조로 유지한다.
- 모바일 사용성을 우선으로 개발한다.
- 충분한 주석을 작성하여 학습용 프로젝트로 관리한다.
- 기존 UI와 디자인의 일관성을 유지한다.

---

# 다음 개발 예정

## 사진

- 확대된 사진 드래그(Pan)
- 더블탭 확대 초기화
- 즐겨찾기 뷰어 동일 기능 적용
- 슬라이드쇼
- 다운로드
- 공유
- 여행 이야기

## 갤러리

- 날짜별 보기
- 장소별 보기
- 여행별 보기
- 다중 업로드

## 서비스

- PWA 전환
- PDF 여행앨범 생성

## 2026-08-07

### Photo Viewer Engine v1 완료

gallery.js
- Swipe
- Pinch Zoom
- Pan
- Double Tap
- Preload
- 확대 중 스와이프 방지

favorite.js
- Swipe
- Pinch Zoom
- Pan
- Double Tap
- 확대 중 스와이프 방지

※ 빠른 확대/축소 시 간헐적인 화면 튐 현상 확인.
Photo Viewer Engine v2 최적화 단계에서 개선 예정.


## Performance v1 예정

- 갤러리 진입 속도 개선
- 사진 뷰어 애니메이션 최적화
- requestAnimationFrame 적용
- GPU(transform3d) 적용
- Lazy Loading
- 뒤로가기 반응속도 개선
- 즐겨찾기 반응속도 개선