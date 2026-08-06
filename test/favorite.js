import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
}
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// =========================
// 📌 전역 변수
// =========================

let photoList = [];

let currentIndex = 0;

// =========================
// 🔍 Photo Viewer Engine
// =========================

// 확대 배율
let scale = 1;

// 확대 위치
let translateX = 0;
let translateY = 0;

// 핀치 시작 거리
let startDistance = 0;

// 드래그 시작 위치
let startX = 0;
let startY = 0;

// 스와이프 시작 위치
let swipeStartY = 0;

// 현재 상태
let isPinching = false;
let isDragging = false;

// 더블탭
let lastTap = 0;

// 내가 다시 보고 싶은 사진 목록
let favoritePhotos =
    JSON.parse(localStorage.getItem("favoritePhotos")) || [];

// 화면 요소
const modalImage = document.getElementById("modalImage");
const photoCount = document.getElementById("photoCount");
const likeBtn = document.getElementById("likeBtn");
const closeModal = document.getElementById("closeModal");
// =========================
// 📷 현재 사진 표시
// =========================

function showPhoto() {

    modalImage.src = photoList[currentIndex].photoUrl;

    photoCount.textContent =
        `${currentIndex + 1} / ${photoList.length}`;

   // 다음 사진 미리 불러오기
if (currentIndex < photoList.length - 1) {

    const nextImage = new Image();

    nextImage.src = photoList[currentIndex + 1].photoUrl;

}

// 이전 사진 미리 불러오기
if (currentIndex > 0) {

    const prevImage = new Image();

    prevImage.src = photoList[currentIndex - 1].photoUrl;

}
}

// =========================
// 📷 즐겨찾기 사진 불러오기
// =========================

async function loadFavoritePhotos() {

    const q = query(

        collection(db, "photos"),

        orderBy("takenAt", "asc")

    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        const photo = doc.data();

        // 내가 ❤️ 누른 사진만 추가
        if (favoritePhotos.includes(doc.id)) {

            photoList.push({

                id: doc.id,

                ...photo

            });

        }

    });

    // 즐겨찾기 사진이 하나도 없을 경우
    if (photoList.length === 0) {

        alert("다시 보고 싶은 사진이 없습니다.");

        history.back();

        return;

    }

    // 첫 번째 사진 표시
   currentIndex = 0;

showPhoto();

}

loadFavoritePhotos();

// =========================
// ↕️ 스와이프
// =========================

modalImage.addEventListener("touchstart", (event) => {

    // 한 손가락
    if (event.touches.length === 1) {

        swipeStartY = event.touches[0].clientY;

        // 확대 상태에서는 드래그 시작
        if (scale > 1) {

            isDragging = true;

            startX =
                event.touches[0].clientX - translateX;

            startY =
                event.touches[0].clientY - translateY;

        }

    }

    // 두 손가락(핀치)
    if (event.touches.length === 2) {

        isPinching = true;

        const dx =
            event.touches[0].clientX -
            event.touches[1].clientX;

        const dy =
            event.touches[0].clientY -
            event.touches[1].clientY;

        startDistance = Math.sqrt(dx * dx + dy * dy);

    }

});

// =========================
// 🔍 핀치 줌
// =========================

modalImage.addEventListener("touchmove", (event) => {

    // 확대 상태에서는 드래그
    if (isDragging && event.touches.length === 1) {

        translateX =
            event.touches[0].clientX - startX;

        translateY =
            event.touches[0].clientY - startY;

        modalImage.style.transform =
            `translate(${translateX}px, ${translateY}px) scale(${scale})`;

        return;

    }

    if (!isPinching) return;

    if (event.touches.length !== 2) return;

    event.preventDefault();

    const dx =
        event.touches[0].clientX -
        event.touches[1].clientX;

    const dy =
        event.touches[0].clientY -
        event.touches[1].clientY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    scale *= distance / startDistance;

    // 최소 1배, 최대 4배
    scale = Math.max(1, Math.min(scale, 4));

    modalImage.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;

    startDistance = distance;

});

modalImage.addEventListener("touchend", (event) => {

    // 드래그 종료
    if (isDragging) {

        isDragging = false;

    }

    // 핀치 종료
    if (isPinching) {

        isPinching = false;

        return;

    }

    // 더블탭
    const now = Date.now();

    if (now - lastTap < 300) {

        if (scale > 1) {

            scale = 1;
            translateX = 0;
            translateY = 0;

        } else {

            scale = 2;

        }

        modalImage.style.transform =
            `translate(${translateX}px, ${translateY}px) scale(${scale})`;

        lastTap = 0;

        return;

    }

    lastTap = now;

    // 확대 중에는 스와이프 금지
    if (scale > 1) return;

    const endY = event.changedTouches[0].clientY;

    const distance = swipeStartY - endY;

    if (distance > 50) {

        if (currentIndex < photoList.length - 1) {

            currentIndex++;

            showPhoto();

        }

    }

    else if (distance < -50) {

        if (currentIndex > 0) {

            currentIndex--;

            showPhoto();

        }

    }

});

// =========================
// ❌ 닫기
// =========================

closeModal.addEventListener("click", () => {

    history.back();

});

// =========================
// ❤️ 즐겨찾기 해제
// =========================

likeBtn.addEventListener("click", () => {

    const photoId = photoList[currentIndex].id;

    // localStorage에서 id 제거
    favoritePhotos = favoritePhotos.filter(
    id => id !== photoId
);

localStorage.setItem(
    "favoritePhotos",
    JSON.stringify(favoritePhotos)
);

    // 현재 목록에서도 제거
    photoList = photoList.filter(
        photo => photo.id !== photoId
    );

    // 모두 삭제된 경우
    if (photoList.length === 0) {

        alert("다시 보고 싶은 사진이 없습니다.");

        history.back();

        return;

    }

    // 마지막 사진이었다면 이전 사진으로
    if (currentIndex >= photoList.length) {

        currentIndex = photoList.length - 1;

    }

    // 화면 갱신
    showPhoto();

});