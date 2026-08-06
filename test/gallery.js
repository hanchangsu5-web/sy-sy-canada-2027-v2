import { db } from "../firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const gallery = document.getElementById("gallery");
let currentDate = "";
let photoList = [];
let currentIndex = 0;

function formatDate(date) {

    if (!date) return "-";

    return date
        .replace(/:/, ".")
        .replace(/:/, ".")
        .replace(" ", " ")
        .substring(0, 16);

}

async function loadPhotos() {

    const q = query(
    collection(db, "photos"),
    orderBy("takenAt", "asc")
);

const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

const photo = doc.data();
const id = doc.id;

photoList.push(photo);

const photoDate = photo.takenAt
    ? photo.takenAt.substring(0, 10).replace(/:/g, ".")
    : "촬영일 없음";

if (photoDate !== currentDate) {

    currentDate = photoDate;

    gallery.innerHTML += `
        <h2 class="date-title">
            📅 ${currentDate}
        </h2>
    `;

}

    gallery.innerHTML += `
        <div class="card">
    <img src="${photo.photoUrl}" class="photo">
</div>

        </div>
    `;

});

}

loadPhotos();

gallery.addEventListener("click", async (event) => {

    if (event.target.classList.contains("photo")) {

    const photos = document.querySelectorAll(".photo");

    currentIndex = Array.from(photos).indexOf(event.target);

    document.getElementById("photoModal").style.display = "flex";

    document.getElementById("modalImage").src = event.target.src;

    console.log("현재 사진 :", currentIndex);

    return;

}

    if (!event.target.classList.contains("editBtn")) {

        return;

    }

    const id = event.target.dataset.id;

const newMemo = prompt("새로운 메모를 입력하세요.");

if (newMemo === null) {

    return;

}

await updateDoc(doc(db, "photos", id), {

    memo: newMemo

});

alert("메모가 수정되었습니다.");

location.reload();

});

const modal = document.getElementById("photoModal");
const closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

let startY = 0;

const modalImage = document.getElementById("modalImage");

modalImage.addEventListener("touchstart", (event) => {

    startY = event.touches[0].clientY;

});

modalImage.addEventListener("touchend", (event) => {

    const endY = event.changedTouches[0].clientY;

    const distance = startY - endY;

    if (distance > 50) {

        alert("⬆ 다음 사진");

    }

    else if (distance < -50) {

        alert("⬇ 이전 사진");

    }

});