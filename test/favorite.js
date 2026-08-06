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

let startY = 0;

modalImage.addEventListener("touchstart", (event) => {

    startY = event.touches[0].clientY;

});

modalImage.addEventListener("touchend", (event) => {

    console.log("touchend");

    const endY = event.changedTouches[0].clientY;

    const distance = startY - endY;

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