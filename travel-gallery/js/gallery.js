/**
 * ==========================================================
 * Travel Gallery V2
 * Gallery
 * ----------------------------------------------------------
 * 갤러리 화면을 관리하는 모듈
 * ==========================================================
 */

import { getState } from "./state.js";
import { openViewer } from "./viewer.js";

/**
 * 갤러리 렌더링
 */
export function renderGallery() {

    const state = getState();

    clearGallery();

    const viewMode = document.getElementById("viewMode")?.value ?? "all";

const photos =
    viewMode === "favorite"
        ? state.photos.filter(photo => photo.favorite)
        : state.photos;

for (const [index, photo] of photos.entries()) {

    const card = createPhotoCard(photo, index);

    appendPhotoCard(card);

}

}

/**
 * 갤러리 비우기
 */
export function clearGallery() {

    const gallery = document.getElementById("galleryGrid");

    if (!gallery) return;

    gallery.innerHTML = "";

}

/**
 * Photo Card 생성
 */
export function createPhotoCard(photo, index) {

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

card.addEventListener("click", () => {
    openViewer(photo.photoId, index);
});

return card;

}

/**
 * Photo Card 추가
 */
export function appendPhotoCard(card) {

    const gallery = document.getElementById("galleryGrid");

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

    const viewMode = document.getElementById("viewMode");

    if (viewMode) {

        // 저장된 보기 모드 복원
        const savedViewMode =
            localStorage.getItem("galleryViewMode");

        if (savedViewMode) {
            viewMode.value = savedViewMode;
        }

        // 보기 변경 시 저장 후 갱신
        viewMode.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    "galleryViewMode",
                    viewMode.value
                );

                refreshGallery();

            }
        );

    }

    renderGallery();

}