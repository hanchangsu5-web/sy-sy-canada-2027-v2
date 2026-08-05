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

    gallery.innerHTML += `
        <div class="card">
            <img src="${photo.photoUrl}">
            <div class="info">

    <strong>👤 작성자</strong> : ${photo.family}<br>

    <strong>📝 메모</strong> : ${photo.memo}<br>

<strong>📅 촬영</strong> : ${formatDate(photo.takenAt)}<br>

<strong>📍 위치</strong> :
${
    photo.latitude
        ? `<a href="https://www.google.com/maps?q=${photo.latitude},${photo.longitude}" target="_blank">
            지도 보기
           </a>`
        : "-"
}

</div>

<button class="editBtn" data-id="${id}">
    ✏️ 메모 수정
</button>
        </div>
    `;

});

}

loadPhotos();

gallery.addEventListener("click", async (event) => {

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