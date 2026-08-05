캐나다 여행 웹앱 프로젝트 이어서 작업.

# 캐나다 여행 웹앱 프로젝트

## 프로젝트 목표
가족 여행을 위한 오프라인 여행 가이드 웹앱 제작

---

# 프로젝트 원칙

- Day1~Day8 구조는 변경하지 않는다.
- 체크리스트 구조는 변경하지 않는다.
- 새로운 기능은 별도 폴더에서 개발한다.
- Day 페이지에는 링크 버튼만 추가한다.
- 기존 디자인 스타일을 유지한다.
- 코드에는 학습용 주석을 충분히 넣는다.
- 답변은 코드 위주로 하고 긴 설명은 최소화한다.
- 긴 코드는 4~6부로 나누어 제공한다.

---

# 맛집 페이지 표준 (2026-08-02 확정)

모든 맛집 페이지는 아래 형식으로 통일한다.

1. 카테고리
2. 식당명
3. 평점
4. 한 줄 추천 설명
5. 대표 메뉴 / 가격 / 추천도
6. Google Maps 버튼(실제 링크)
7. ← 맛집 모음 버튼

Google Maps 버튼은 아래 형식을 사용한다.

```html
<a href="실제 Google Maps 링크"
   target="_blank"
   class="map-button">

    📍 Google Maps

</a>
```

---

# 완료

## Day
- Day1 ~ Day8 완료

## Checklist
- 완료

## Voucher
- 완료

## Restaurants (리뉴얼 완료)

- Calgary
- Granville Island
- Downtown (숙소 주변)
- English Bay

모든 페이지에
- 한 줄 추천 설명
- Google Maps 버튼
- 동일한 카드 디자인 적용 완료

---

# 작업 기록 (2026-08-03)

## 이전 작업 요약

오늘 작업 완료

- Google My Maps를 Viewer 링크 방식으로 변경
- google-mymaps-links.md 생성
- 여행도구 > 지도(index) 완성
- Day1~Day6 지도 버튼을 My Maps Viewer로 연결
- Day1~Day6 맛집 카드를 지역별 맛집 페이지 링크로 변경
- 맛집 페이지 구조 정리 및 중복 내용 일부 삭제
- app.js / home.html 사용 여부 확인 및 프로젝트 구조 정리
- Git 커밋 완료

## 다음 작업

사진/메모 기능(Firebase)

목표
- Firebase 프로젝트 생성
- Firestore / Storage 구조 설계
- 사진 업로드
- 메모 작성
- 가족 간 실시간 공유
- 사진 좋아요(❤️)
- 익명 인기투표
- TOP3 자동 집계 및 시상 기능

※ Firebase를 배우면서 재사용 가능한 구조로 구현한다.

## V2 시작

- Firebase 기반 여행 기록 서비스 개발 시작
- 기존 V1은 안정 버전으로 유지
- 모든 신규 기능은 V2에서 개발

✅ Firebase 프로젝트 생성
✅ Billing 연결
✅ Storage 생성
✅ firebase.js 작성
✅ V2 프로젝트 생성
✅ GitHub V2 생성
✅ Firebase SDK 연결 성공


내가 추천하는 다음 테스트는

Firebase 연결
        ✅
Firestore 읽기/쓰기
        ↓
Storage 업로드
        ↓
사진 업로드

순서야.

이제 테스트 폴더가 생겼으니 앞으로는

test/
    index.html
    script.js
    style.css

여기서만 Firebase를 충분히 검증한 후에 메인 프로젝트에 적용하자.


##2026-08-05 작업

## 완료

✔ Firebase 연동

✔ 사진 업로드

✔ Storage 저장

✔ Firestore 저장

✔ 갤러리 출력

✔ 메모 수정

✔ EXIF 촬영시간 저장

✔ GPS 저장

✔ Google Maps 연동

✔ 대표 장소 자동 저장

---

## 확인 사항

- 원본 사진에서는 EXIF 정상 추출
- 카카오톡 사진 및 일부 편집 사진은 EXIF 제거됨
- GPS OFF 상태에서 촬영한 사진은 위치정보 없음
- 지도보기는 GPS 좌표 기준이므로 정확하게 동작

---

## 다음 작업 예정

1. 날짜별 보기

2. 장소별 보기

3. 여행별 보기

4. 사진 확대 보기

5. 다중 업로드

6. PWA 앱 전환


  voucher/images/ 파일명

icn-cgy-seyoung.jpg
icn-cgy-seoyun.jpg

cgy-yvr-seyoung.jpg
cgy-yvr-seoyun.jpg

yvr-icn-seyoung.jpg
yvr-icn-seoyun.jpg

rental-voucher.jpg

moraine-voucher.jpg

gondola-voucher.jpg

cruise-voucher.jpg