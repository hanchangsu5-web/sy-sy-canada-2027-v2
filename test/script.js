import { db, storage } from "../firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-storage.js";

const status = document.getElementById("status");

status.textContent = "✅ Firebase 연결 성공!";

async function saveTest() {

    try {

        const docRef = await addDoc(collection(db, "test"), {

            name: "창수",
            message: "Firebase 테스트 성공",
            createdAt: new Date()

        });

        console.log("저장 성공 :", docRef.id);

        status.innerHTML += "<br>✅ Firestore 저장 성공!";

    } catch (error) {

        console.error(error);

        status.innerHTML += "<br>❌ Firestore 저장 실패!";

    }

}

saveTest();

const photo = document.getElementById("photo");
const uploadBtn = document.getElementById("uploadBtn");
const preview = document.getElementById("preview");
const family = document.getElementById("family");
const memo = document.getElementById("memo");
const photoUrl = document.getElementById("photoUrl");

uploadBtn.addEventListener("click", async () => {

    if (photo.files.length === 0) {

        alert("사진을 선택하세요.");

        return;

    }

    const file = photo.files[0];

console.log("파일 타입 :", file.type);
console.log("파일 이름 :", file.name);

const tags = await ExifReader.load(file);

console.log("촬영시간 :", tags["DateTimeOriginal"]);
console.log("GPS 위도 :", tags["GPSLatitude"]);
console.log("GPS 경도 :", tags["GPSLongitude"]);
console.table(Object.keys(tags));

const storageRef = ref(storage, "test/" + file.name);

    try {

        await uploadBytes(storageRef, file);

const url = await getDownloadURL(storageRef);

let location = "";

if (tags["GPSLatitude"] && tags["GPSLongitude"]) {

    const lat = tags["GPSLatitude"].description;
    const lon = tags["GPSLongitude"].description;

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );

        const data = await response.json();

        console.log(data.address);

        const address = data.address;

location =
    address.tourism ||
    address.attraction ||
    address.leisure ||
    address.hamlet ||
    address.village ||
    address.suburb ||
    address.city ||
    address.county ||
    data.display_name;

console.log("대표 장소 :", location);

    } catch (error) {

        console.log("장소 읽기 실패");

    }

}

photoUrl.textContent = url;

preview.src = url;
preview.style.display = "block";

alert("사진 업로드 성공!");

console.log("업로드 완료 :", file.name);
console.log("사진 URL :", url);

console.log("family :", family.value);
console.log("memo :", memo.value);

await addDoc(collection(db, "photos"), {

    family: family.value,
    memo: memo.value,
    fileName: file.name,
    photoUrl: url,
    takenAt: tags["DateTimeOriginal"]?.description || "",
    latitude: tags["GPSLatitude"]?.description || "",
    longitude: tags["GPSLongitude"]?.description || "",
    location: location,

    createdAt: new Date()

});
console.log("Firestore 저장 완료!");
status.innerHTML += "<br>✅ 사진 정보 저장 성공!";

//window.location.href = "gallery.html";

    } catch (error) {

        console.error(error);

        alert("업로드 실패!");

    }

});
