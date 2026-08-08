// ======================================================
// Travel Gallery
// upload.js
// ======================================================

import {
    uploadPhoto
} from "./photoService.js";

// ======================================================
// DOM
// ======================================================

const photoInput = document.getElementById("photoInput");

const selectedPhotoCount = document.getElementById("selectedPhotoCount");

const ownerSelect = document.getElementById("ownerSelect");

const memoInput = document.getElementById("memoInput");

const uploadButton = document.getElementById("uploadButton");

// ======================================================
// State
// ======================================================

let selectedFiles = [];

// ======================================================
// Initialize
// ======================================================

document.addEventListener("DOMContentLoaded", initUpload);

// ======================================================
// Upload Initialize
// ======================================================

function initUpload() {

    bindEvents();

}

// ======================================================
// Event Binding
// ======================================================

function bindEvents() {

    photoInput.addEventListener(
        "change",
        handleFileSelection
    );

    uploadButton.addEventListener(
        "click",
        handleUpload
    );

}

// ======================================================
// File Selection
// ======================================================

function handleFileSelection(event) {

    selectedFiles = Array.from(event.target.files);

    updateSelectedPhotoCount();

}

// ======================================================
// Selected Photo Count
// ======================================================

function updateSelectedPhotoCount() {

    const count = selectedFiles.length;

    selectedPhotoCount.textContent =
        `선택된 사진 : ${count}장`;

}

// ======================================================
// Upload
// ======================================================

async function handleUpload() {

    // 사진 선택 확인
    if (selectedFiles.length === 0) {

        alert("사진을 선택해주세요.");

        return;

    }

    // 작성자 확인
    if (!ownerSelect.value) {

        alert("작성자를 선택해주세요.");

        return;

    }

    const owner = ownerSelect.value;

    const memo = memoInput.value.trim();

    for (const file of selectedFiles) {

    await uploadPhoto(file, owner);

}

    alert(`${selectedFiles.length}장의 사진이 추가되었습니다.`);

    resetUploadForm();

}

// ======================================================
// Reset Upload Form
// ======================================================

function resetUploadForm() {

    // 선택한 파일 초기화
    selectedFiles = [];
    photoInput.value = "";

    // 작성자 초기화
    ownerSelect.selectedIndex = 0;

    // 메모 초기화
    memoInput.value = "";

    // 사진 개수 표시 초기화
    updateSelectedPhotoCount();

}