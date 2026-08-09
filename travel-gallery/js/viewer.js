import {getPhoto,updatePhotoMemo,updatePhotoFavorite,deletePhoto} from "./photoService.js";
import { getState, setCurrentPhoto } from "./state.js";
import { refreshGallery } from "./gallery.js";

/**
 * Viewer DOM
 */

const informationFileName = document.getElementById("informationFileName");
const informationOwner = document.getElementById("informationOwner");
const informationResolution = document.getElementById("informationResolution");
const informationFileSize = document.getElementById("informationFileSize");
const informationMemo = document.getElementById("informationMemo");
const saveMemoButton = document.getElementById("saveMemoButton");
const deleteButton = document.getElementById("deleteButton");
const favoriteButton = document.getElementById("favoriteButton");
const memoLength = document.getElementById("memoLength");

const viewerOverlay = document.getElementById("viewerOverlay");
const viewerImage = document.getElementById("viewerImage");

const informationPanel = document.getElementById("informationPanel");
const informationButton = document.getElementById("infoButton");
const informationHandle = document.getElementById("informationHandle");
const informationContent = document.getElementById("informationContent");


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

function toggleInformationPanel() {

    if (informationPanel.classList.contains("hidden")) {

        informationPanel.classList.remove("hidden");

        informationPanel.classList.add("open");

    } else {

        informationPanel.classList.remove("open");

        informationPanel.classList.add("hidden");

    }

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

    const fileSizeMB = (photo.fileSize / 1024 / 1024).toFixed(2);

    informationFileName.textContent = photo.fileName;
    informationOwner.textContent = photo.owner ?? "-";
    informationResolution.textContent = `${photo.width} × ${photo.height}`;
    informationFileSize.textContent = `${fileSizeMB} MB`;
    informationMemo.value = photo.memo ?? "";
    memoLength.textContent = informationMemo.value.length;

    deleteButton.classList.remove("hidden");

    updateFavoriteButton(photo);

}

function updateFavoriteButton(photo) {

    if (!favoriteButton) {
        return;
    }

    if (photo.favorite) {

        favoriteButton.classList.add("active");
        favoriteButton.textContent = "❤️";

    } else {

        favoriteButton.classList.remove("active");
        favoriteButton.textContent = "🤍";

    }

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
 * 메모 저장
 */
async function saveMemo() {

    const state = getState();

    const memo = informationMemo.value.trim();

    await updatePhotoMemo(
        state.currentPhotoId,
        memo
    );

}

/**
 * 사진 삭제
 */
async function deleteCurrentPhoto() {

    const state = getState();

    const confirmed = confirm(
        "이 사진을 삭제하시겠습니까?"
    );

    if (!confirmed) {
        return;
    }

    await deletePhoto(
        state.currentPhotoId
    );

    refreshGallery();
    closeViewer();

}

/**
 * 즐겨찾기 토글
 */
async function toggleFavorite() {

    const state = getState();

    const photo = getPhoto(state.currentPhotoId);

    if (!photo) {
        return;
    }

    const favorite = !photo.favorite;

    await updatePhotoFavorite(
        photo.photoId,
        favorite
    );

    
}

/**
 * Toolbar 이벤트 연결
 */
function bindToolbarEvents() {

    const closeButton = document.getElementById("closeViewerButton");
    const previousButton = document.getElementById("previousButton");
    const nextButton = document.getElementById("nextButton");
    const informationButton = document.getElementById("infoButton");

    if (informationButton) {
        informationButton.addEventListener(
            "click",
            toggleInformationPanel
        );
    }

    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closeViewer
        );
    }

    if (previousButton) {
        previousButton.addEventListener(
            "click",
            previousPhoto
        );
    }

    if (nextButton) {
        nextButton.addEventListener(
            "click",
            nextPhoto
        );
    }

    if (saveMemoButton) {
        saveMemoButton.addEventListener(
            "click",
            saveMemo
        );
    }

    if (deleteButton) {
        deleteButton.addEventListener(
            "click",
            deleteCurrentPhoto
        );
    }

    if (favoriteButton) {
        favoriteButton.addEventListener(
            "click",
            toggleFavorite
        );
    }

    informationMemo.addEventListener(
        "input",
        () => {
            memoLength.textContent = informationMemo.value.length;
        }
    );

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