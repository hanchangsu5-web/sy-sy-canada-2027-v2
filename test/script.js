import { db, storage } from "../firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    ref,
    uploadBytes
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

uploadBtn.addEventListener("click", async () => {

    if (photo.files.length === 0) {

        alert("사진을 선택하세요.");

        return;

    }

    const file = photo.files[0];

    const storageRef = ref(storage, "test/" + file.name);

    try {

        await uploadBytes(storageRef, file);

        alert("사진 업로드 성공!");

        console.log("업로드 완료 :", file.name);

    } catch (error) {

        console.error(error);

        alert("업로드 실패!");

    }

});