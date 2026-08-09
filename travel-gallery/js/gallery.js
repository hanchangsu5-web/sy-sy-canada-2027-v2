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

export function renderGallery() {

    const state = getState();

    clearGallery();

    const gallery = document.getElementById("galleryGrid");

    const viewMode =
        document.getElementById("viewMode")?.value ?? "all";

    const sortMode =
        document.getElementById("sortMode")?.value ?? "takenDesc";

    let photos =
        viewMode === "favorite"
            ? state.photos.filter(photo => photo.favorite)
            : [...state.photos];

    switch (sortMode) {

        case "takenAsc":

            photos.sort((a, b) => {

                const dateA = a.createdAt?.seconds
                    ? a.createdAt.seconds
                    : new Date(a.createdAt).getTime();

                const dateB = b.createdAt?.seconds
                    ? b.createdAt.seconds
                    : new Date(b.createdAt).getTime();

                return dateA - dateB;

            });

            break;

        case "owner":

            photos.sort((a, b) => {

                const ownerCompare =
                    (a.owner ?? "").localeCompare(
                        b.owner ?? "",
                        "ko"
                    );

                if (ownerCompare !== 0) {
                    return ownerCompare;
                }

                const dateA = a.createdAt?.seconds
                    ? a.createdAt.seconds
                    : new Date(a.createdAt).getTime();

                const dateB = b.createdAt?.seconds
                    ? b.createdAt.seconds
                    : new Date(b.createdAt).getTime();

                return dateB - dateA;

            });

            break;

        case "takenDesc":

        default:

            photos.sort((a, b) => {

                const dateA = a.createdAt?.seconds
                    ? a.createdAt.seconds
                    : new Date(a.createdAt).getTime();

                const dateB = b.createdAt?.seconds
                    ? b.createdAt.seconds
                    : new Date(b.createdAt).getTime();

                return dateB - dateA;

            });

            break;

    }

    let previousHeader = "";

    for (const [index, photo] of photos.entries()) {

        // 사람별 헤더
        if (sortMode === "owner") {

            const owner = photo.owner ?? "알 수 없음";

            if (owner !== previousHeader) {

                const header = document.createElement("div");

                header.className = "gallery-date-header";

                header.textContent = `👤 ${owner}`;

                gallery.appendChild(header);

                previousHeader = owner;

            }

        } else {

            const createdAt = photo.createdAt?.seconds
                ? new Date(photo.createdAt.seconds * 1000)
                : new Date(photo.createdAt);

            const weekNames = [
                "일",
                "월",
                "화",
                "수",
                "목",
                "금",
                "토"
            ];

            const year = createdAt.getFullYear();
            const month = String(createdAt.getMonth() + 1).padStart(2, "0");
            const day = String(createdAt.getDate()).padStart(2, "0");
            const week = weekNames[createdAt.getDay()];

            const dateText =
                `${year}.${month}.${day} (${week})`;

            if (dateText !== previousHeader) {

                const header = document.createElement("div");

                header.className = "gallery-date-header";

                header.textContent = dateText;

                gallery.appendChild(header);

                previousHeader = dateText;

            }

        }

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
    const sortMode = document.getElementById("sortMode");

    if (viewMode) {

        const savedViewMode =
            localStorage.getItem("galleryViewMode");

        if (savedViewMode) {
            viewMode.value = savedViewMode;
        }

        viewMode.addEventListener("change", () => {

            localStorage.setItem(
                "galleryViewMode",
                viewMode.value
            );

            refreshGallery();

        });

    }

    if (sortMode) {

        sortMode.addEventListener(
            "change",
            refreshGallery
        );

    }

    renderGallery();

}