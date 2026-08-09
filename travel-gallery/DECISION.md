# Architecture Decisions

## 001

Photo 중심 설계

이유

- 모든 기능의 기준이 된다.
- photoId를 사용할 수 있다.

---

## 002

Loader 분리

이유

- 성능 관리
- 메모리 관리
- 이미지 캐시

# 2026-08-08

## Firebase 저장 구조 확정

### 결정 사항

- 사진 원본은 Firebase Storage에 저장한다.
- 사진 메타데이터는 Cloud Firestore에 저장한다.
- Firestore의 `photos` 컬렉션을 사용한다.
- Gallery는 Firestore를 직접 참조하지 않고 State를 통해 렌더링한다.

### 데이터 흐름

Upload
↓
Firebase Storage
↓
Download URL 생성
↓
Cloud Firestore 저장
↓
loadPhotos()
↓
State
↓
Gallery

### 유지 원칙

- Photo 객체를 Gallery의 단일 데이터 모델로 사용한다.
- photoId를 모든 사진의 고유 식별자로 사용한다.
- Storage 저장 경로는 `photos/{photoId}.jpg` 형식을 유지한다.

