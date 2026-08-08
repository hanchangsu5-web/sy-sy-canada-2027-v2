import { getPhoto } from "./photoService.js";
import { getState, setCurrentPhoto } from "./state.js";

/**
 * Viewer DOM
 */

const viewerOverlay = document.getElementById("viewerOverlay");
const viewerImage = document.getElementById("viewerImage");



/**
 * Viewer 열기
 */
export function openViewer(photoId, index) {

    const photo = getPhoto(photoId);

    if (!photo) {
        return;
    }

    setCurrentPhoto(photoId, index);

    showPhoto(photo);

    viewerOverlay.classList.remove("hidden");

}



/**
 * Viewer 닫기
 */
export function closeViewer() {

    viewerOverlay.classList.add("hidden");

}



/**
 * Photo 표시
 */
export function showPhoto(photo) {

    if (!photo) {
        return;
    }

    viewerImage.src = photo.displayUrl;
    viewerImage.alt = photo.fileName ?? "Travel Photo";

}

/**
 * 다음 사진
 */
export function nextPhoto() {

    const state = getState();

    const nextIndex = state.currentIndex + 1;

    if (nextIndex >= state.photos.length) {
        return;
    }

    const nextPhoto = state.photos[nextIndex];

    setCurrentPhoto(nextPhoto.photoId, nextIndex);

    showPhoto(nextPhoto);

}



/**
 * 이전 사진
 */
export function previousPhoto() {

    const state = getState();

    const previousIndex = state.currentIndex - 1;

    if (previousIndex < 0) {
        return;
    }

    const previousPhoto = state.photos[previousIndex];

    setCurrentPhoto(previousPhoto.photoId, previousIndex);

    showPhoto(previousPhoto);

}



/**
 * Viewer 새로고침
 */
export function refreshViewer() {

    const state = getState();

    const photo = getPhoto(state.currentPhotoId);

    if (!photo) {
        closeViewer();
        return;
    }

    showPhoto(photo);

}

/**
 * Toolbar 이벤트 연결
 */
function bindToolbarEvents() {

    const closeButton = document.getElementById("closeViewerButton");
    const previousButton = document.getElementById("previousButton");
    const nextButton = document.getElementById("nextButton");

    if (closeButton) {
        closeButton.addEventListener("click", closeViewer);
    }

    if (previousButton) {
        previousButton.addEventListener("click", previousPhoto);
    }

    if (nextButton) {
        nextButton.addEventListener("click", nextPhoto);
    }

}

/**
 * 초기화 여부
 */

let initialized = false;



/**
 * Viewer 초기화
 */
export function initViewer() {

    if (initialized) {
        return;
    }

    bindToolbarEvents();

    initialized = true;

}