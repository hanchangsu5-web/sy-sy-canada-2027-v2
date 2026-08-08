/**
 * ==========================================================
 * Travel Gallery V2
 * Photo Service
 * ----------------------------------------------------------
 * Photo 객체를 생성하고 관리하는 모듈
 *
 * 역할
 * - Photo 객체 생성
 * - Photo 목록 관리
 * - Photo CRUD
 * ==========================================================
 */

/**
 * State 초기값 생성
 */
function createInitialState() {
    return {
        // Photo 목록
        photos: [],

        // 현재 선택된 사진
        currentPhotoId: null,
        currentIndex: -1,

        // Viewer 상태
        viewer: {
            isOpen: false,
            zoom: 1,
            translateX: 0,
            translateY: 0,
            rotation: 0
        },

        // Gallery 상태
        gallery: {
            scrollTop: 0,
            groupMode: "date"
        },

        // 슬라이드쇼
        slideshow: {
            isPlaying: false,
            interval: 3000
        },

        // 로딩 상태
        loading: {
            isLoading: false,
            progress: 0
        }
    };
}

/**
 * 현재 State
 */
let state = createInitialState();

/**
 * State 조회
 */
export function getState() {
    return state;
}

/**
 * State 초기화
 */
export function resetState() {
    state = createInitialState();
}

/**
 * Photo 목록 저장
 */
export function setPhotos(photos) {
    state.photos = photos;
}

/**
 * Photo 목록 저장
 */
export function setPhotos(photos) {
    state.photos = photos;
}

/**
 * 현재 선택된 사진 변경
 */
export function setCurrentPhoto(photoId, index) {
    state.currentPhotoId = photoId;
    state.currentIndex = index;
}

/**
 * Viewer 열기 / 닫기
 */
export function setViewerOpen(isOpen) {
    state.viewer.isOpen = isOpen;
}

/**
 * 확대 배율 변경
 */
export function setViewerZoom(zoom) {
    state.viewer.zoom = zoom;
}

/**
 * Viewer 위치 변경
 */
export function setViewerPosition(x, y) {
    state.viewer.translateX = x;
    state.viewer.translateY = y;
}

/**
 * 회전
 */
export function setViewerRotation(rotation) {
    state.viewer.rotation = rotation;
}

/**
 * Gallery 스크롤 위치 저장
 */
export function setGalleryScroll(scrollTop) {
    state.gallery.scrollTop = scrollTop;
}

/**
 * 슬라이드쇼 재생 여부
 */
export function setSlideshow(isPlaying) {
    state.slideshow.isPlaying = isPlaying;
}

/**
 * 슬라이드쇼 간격 변경
 */
export function setSlideshowInterval(interval) {
    state.slideshow.interval = interval;
}

/**
 * 로딩 상태 변경
 */
export function setLoading(isLoading, progress = 0) {
    state.loading.isLoading = isLoading;
    state.loading.progress = progress;
}
