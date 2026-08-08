/**
 * ==========================================================
 * Travel Gallery V2
 * Gallery
 * ----------------------------------------------------------
 * 갤러리 화면을 관리하는 모듈
 * ==========================================================
 */

import { getState } from "./state.js";

/**
 * 갤러리 렌더링
 */
export function renderGallery() {

    const state = getState();

    clearGallery();

    for (const photo of state.photos) {

        const card = createPhotoCard(photo);

        appendPhotoCard(card);

    }

}

/**
 * 갤러리 비우기
 */
export function clearGallery() {

    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    gallery.innerHTML = "";

}

/**
 * Photo Card 생성
 */
export function createPhotoCard(photo) {

    const card = document.createElement("div");

    card.className = "photo-card";

    const wrapper = document.createElement("div");
wrapper.className = "photo-image-wrapper";

const image = document.createElement("img");
image.className = "photo-image";

image.src = photo.displayUrl;
image.alt = photo.fileName;
image.loading = "lazy";

const overlay = document.createElement("div");
overlay.className = "photo-overlay";

wrapper.appendChild(image);

card.appendChild(wrapper);
card.appendChild(overlay);

    return card;

}

/**
 * Photo Card 추가
 */
export function appendPhotoCard(card) {

    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    gallery.appendChild(card);

}

/**
 * 갤러리 새로고침
 */
export function refreshGallery() {

    renderGallery();

}

/**
 * Gallery 초기화
 */
export function initGallery() {

    renderGallery();

}