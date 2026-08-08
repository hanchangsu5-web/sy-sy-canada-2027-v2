/**
 * ==========================================================
 * Travel Gallery V2
 * Photo Service
 * ----------------------------------------------------------
 * Firebase와 통신하는 유일한 모듈
 *
 * 역할
 * - Photo 목록 로드
 * - Photo 업로드
 * - Photo 정보 수정
 * - Photo 삭제
 * - Photo 조회
 * ==========================================================
 */

import { getState, setPhotos } from "./state.js";

/**
 * Photo 객체 생성
 */
export function createPhoto(data = {}) {

    return {

        // 기본 정보
        photoId: data.photoId ?? "",
        mediaType: data.mediaType ?? "image",

        // 이미지 경로
        displayUrl: data.displayUrl ?? "",
        originalUrl: data.originalUrl ?? "",

        // 이미지 정보
        width: data.width ?? 0,
        height: data.height ?? 0,

        fileSize: data.fileSize ?? 0,
        fileName: data.fileName ?? "",

        // 날짜
        createdAt: data.createdAt ?? "",
        updatedAt: data.updatedAt ?? "",

        // 사용자 정보
        favorite: data.favorite ?? false,

        // 위치
        location: data.location ?? null

    };

}

/**
 * Photo 목록 불러오기
 */
export async function loadPhotos() {

     // TODO: Firebase에서 Photo 데이터를 불러온다.

    const photos = [];

    setPhotos(photos);

    return photos;

}

/**
 * Photo 추가
 */
export function addPhoto(photo) {

    const state = getState();

    const photos = [...state.photos, photo];

    setPhotos(photos);

    return photo;

}

/**
 * Photo 삭제
 */
export function removePhoto(photoId) {

    const state = getState();

    const photos = state.photos.filter(photo => photo.photoId !== photoId);

    setPhotos(photos);

}

/**
 * Photo 수정
 */
export function updatePhoto(updatedPhoto) {

    const state = getState();

    const photos = state.photos.map(photo => {

        if (photo.photoId === updatedPhoto.photoId) {
            return updatedPhoto;
        }

        return photo;

    });

    setPhotos(photos);

    return updatedPhoto;

}

/**
 * Photo 조회
 */
export function getPhoto(photoId) {

    const state = getState();

    return state.photos.find(
        photo => photo.photoId === photoId
    ) ?? null;

}

/**
 * Photo 업로드
 */
export async function uploadPhoto() {

}

/**
 * Photo 삭제
 */
export async function deletePhoto() {

}

