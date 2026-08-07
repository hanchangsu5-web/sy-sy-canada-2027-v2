import { db } from "../firebase.js";

// =========================
// 📷 여행 갤러리
// Firebase에서 사진을 불러와
// 날짜별로 갤러리를 생성한다.
// =========================

import {
    collection,
    getDocs,
    query,
    orderBy,
    doc,
    updateDoc,
    increment
}
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// =========================
// 📌 전역 변수
// =========================

const gallery = document.getElementById("gallery");
// =========================
// 📷 큰 사진 정보
// =========================

const photoLocation = document.getElementById("photoLocation");

const photoDate = document.getElementById("photoDate");

const photoFamily = document.getElementById("photoFamily");

const photoMemo = document.getElementById("photoMemo");

// =========================
// 📖 사진 정보 표시
// =========================

let currentDate = "";
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

// 드래그 가능 범위
let maxTranslateX = 0;
let maxTranslateY = 0;

// 스와이프 이동 거리
let dragY = 0;

// 핀치 시작 거리
let startDistance = 0;

// 드래그 시작 위치
let startX = 0;
let startY = 0;

// 현재 상태
let isPinching = false;
let isDragging = false;

// =========================
// 🎨 화면 갱신
// =========================

function updateTransform() {

    modalImage.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;

}

// =========================
// 📅 날짜 표시 형식 변경
// =========================

function formatDate(date) {

    if (!date) return "-";

    return date
        .replace(/:/, ".")
        .replace(/:/, ".")
        .replace(" ", " ")
        .substring(0, 16);

}

// =========================
// 📷 Firebase에서 사진을 불러와
// 날짜별 갤러리를 생성한다.
// =========================

async function loadPhotos() {

    const q = query(
    collection(db, "photos"),
    orderBy("takenAt", "asc")
);

const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

const photo = doc.data();
const id = doc.id;

photoList.push({
    id,
    ...photo
});

const photoDate = photo.takenAt
    ? photo.takenAt.substring(0, 10).replace(/:/g, ".")
    : "촬영일 없음";

if (photoDate !== currentDate) {

    currentDate = photoDate;

    gallery.innerHTML += `
    <h2 class="date-title">
        📅 ${currentDate}
    </h2>

    <div class="photo-grid" id="grid-${currentDate}">
    </div>
`;

}

    document.getElementById(`grid-${currentDate}`).innerHTML += `
    <div class="card">
    <img src="${photo.photoUrl}" class="photo">

        </div>
    `;

});

}

// =========================
// 🖱️ 갤러리 클릭 이벤트
// 썸네일 클릭 → 큰 사진 보기
// 메모 수정 버튼 처리
// =========================

loadPhotos();

gallery.addEventListener("click", async (event) => {

    // 사진 클릭
    if (event.target.classList.contains("photo")) {

        const photos = document.querySelectorAll(".photo");

        currentIndex = Array.from(photos).indexOf(event.target);

        document.getElementById("photoModal").style.display = "flex";

        document.body.style.overflow = "hidden";
        
        showPhoto();

        return;

    }

    // 앞으로 버튼(다운로드, 여행 이야기 수정 등)은
    // 이 아래에서 처리한다.

});

// =========================
// 🖼️ 큰 사진 보기(모달)
// =========================

// =========================
// 📷 현재 사진 표시
// =========================

function showPhoto() {

    // 뷰어 상태 초기화
dragY = 0;
translateX = 0;
translateY = 0;

modalImage.style.transition = "none";

// 사진이 바뀌면 확대와 위치 초기화
scale = 1;
translateX = 0;
translateY = 0;

updateTransform();

modalImage.src = photoList[currentIndex].photoUrl;

console.log(
    "showPhoto",
    modalImage.clientWidth,
    modalImage.clientHeight,
    modalImage.naturalWidth,
    modalImage.naturalHeight
);

    
    document.getElementById("photoCount").textContent =
        `${currentIndex + 1} / ${photoList.length}`;

    updateFavoriteButton();


   
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

const modal = document.getElementById("photoModal");
const closeModal = document.getElementById("closeModal");



closeModal.addEventListener("click", () => {

    modal.style.display = "none";

    document.body.style.overflow = "auto";

});

// =========================
// ↕️ 스와이프
// 위/아래 스와이프로 사진 이동
// =========================

let swipeStartY = 0;

const modalImage =
    document.getElementById("modalImage");

let lastTap = 0;

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

    // 일반 스와이프(1배 상태)
if (!isDragging && scale === 1 && event.touches.length === 1) {

    dragY = event.touches[0].clientY - swipeStartY;

    modalImage.style.transform =
        `translateY(${dragY}px)`;

    return;

}

        // 확대 상태에서는 드래그
    if (isDragging && event.touches.length === 1) {

        translateX =
    event.touches[0].clientX - startX;

translateY =
    event.touches[0].clientY - startY;

// 드래그 범위 제한
translateX = Math.max(
    -maxTranslateX,
    Math.min(maxTranslateX, translateX)
);

translateY = Math.max(
    -maxTranslateY,
    Math.min(maxTranslateY, translateY)
);

        updateTransform();

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

    console.log(
    "pinch",
    modalImage.clientWidth,
    modalImage.clientHeight,
    modalImage.naturalWidth,
    modalImage.naturalHeight
);

    scale *= distance / startDistance;

    // 최소 1배, 최대 4배
    scale = Math.max(1, Math.min(scale, 4));

    // 확대 배율이 바뀌면 드래그 범위도 다시 계산
maxTranslateX =
    (modalImage.clientWidth * scale - window.innerWidth) / 2;

maxTranslateY =
    (modalImage.clientHeight * scale - window.innerHeight) / 2;

    // 현재 위치도 새로운 범위 안으로 보정
translateX = Math.max(
    -maxTranslateX,
    Math.min(maxTranslateX, translateX)
);

translateY = Math.max(
    -maxTranslateY,
    Math.min(maxTranslateY, translateY)
);

    updateTransform();

    startDistance = distance;

});

modalImage.addEventListener("touchend", (event) => {

    // 드래그 종료
if (isDragging) {

    isDragging = false;

}

    if (isPinching) {

        isPinching = false;

        return;

    }

    // 더블탭
    // 더블탭 위치
    let tapX = event.changedTouches[0].clientX;
    let tapY = event.changedTouches[0].clientY;

    // 확대 상태에서 드래그 범위 계산
if (scale > 1) {

    maxTranslateX =
        (modalImage.clientWidth * scale - window.innerWidth) / 2;

    maxTranslateY =
        (modalImage.clientHeight * scale - window.innerHeight) / 2;

}

    const now = Date.now();

    if (now - lastTap < 300) {

        if (scale > 1) {

    scale = 1;
    translateX = 0;
    translateY = 0;

} else {

    scale = 2;

    translateX =
        window.innerWidth / 2 - tapX;

    translateY =
        window.innerHeight / 2 - tapY;

}

        updateTransform();

        lastTap = 0;

        return;

    }

    lastTap = now;

    if (scale > 1) return;

    // 충분히 밀었는지 확인
if (Math.abs(dragY) > 120) {

    // 위로 넘김
    if (dragY < 0) {

        modalImage.style.transition =
            "transform 0.25s ease";

        modalImage.style.transform =
            "translateY(-100vh)";

    }

    // 아래로 넘김
    else {

        modalImage.style.transition =
            "transform 0.25s ease";

        modalImage.style.transform =
            "translateY(100vh)";

    }

    return;

}

// 원래 자리로 복귀
modalImage.style.transition =
    "transform 0.2s ease";

modalImage.style.transform =
    "translateY(0px)";

return;
   
});

// =========================
// ❤️ 즐겨찾기 기능
// 다시 보고 싶은 사진을 저장한다.
// Firestore와 localStorage를 함께 사용한다.
// =========================

const likeBtn = document.getElementById("likeBtn");

// 내가 즐겨찾기한 사진 목록(localStorage)
let favoritePhotos =
    JSON.parse(localStorage.getItem("favoritePhotos")) || [];

// 현재 사진이 즐겨찾기인지 확인하여
// ❤️ 또는 🤍를 표시한다.
function updateFavoriteButton() {

    const photoId = photoList[currentIndex].id;

    if (favoritePhotos.includes(photoId)) {

        likeBtn.textContent = "❤️";

    } else {

        likeBtn.textContent = "🤍";

    }

}

likeBtn.addEventListener("click",

 async () => {

    const photoId = photoList[currentIndex].id;

    const favorite = favoritePhotos.includes(photoId);

    if (favorite) {

        favoritePhotos =
            favoritePhotos.filter(id => id !== photoId);

        await updateDoc(doc(db, "photos", photoId), {

            favorites: increment(-1)

        });

    } else {

        favoritePhotos.push(photoId);

        await updateDoc(doc(db, "photos", photoId), {

            favorites: increment(1)

        });

    }

    localStorage.setItem(

        "favoritePhotos",

        JSON.stringify(favoritePhotos)

    );

    updateFavoriteButton();

    console.log(likeBtn.textContent);

});





// =========================
// 🎬 슬라이드 종료
// =========================

modalImage.addEventListener("transitionend", () => {

    // 화면 밖으로 나간 경우만
    if (Math.abs(dragY) <= 120) return;

    if (dragY < 0) {

        if (currentIndex < photoList.length - 1) {

            currentIndex++;

        }

    } else {

        if (currentIndex > 0) {

            currentIndex--;

        }

    }

    showPhoto();

});