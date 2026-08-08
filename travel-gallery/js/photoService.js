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
import { db, storage } from "../firebase.js";

import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    serverTimestamp,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

/**
 * Photo 객체 생성
 * 기본값을 포함한 Photo 객체를 생성한다.
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

// 업로드한 사용자
owner: data.owner ?? "",

// 메모
memo: data.memo ?? "",

// 위치
location: data.location ?? null

    };

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
export async function uploadPhoto(file, owner) {

    // Photo 고유 ID 생성
    const photoId = crypto.randomUUID();

    // 파일 확장자
    const extension = file.name.split(".").pop().toLowerCase();

    // Storage 저장 경로
    const storagePath = `photos/${photoId}.${extension}`;

    console.log("Photo ID :", photoId);
    console.log("Storage :", storagePath);

    // Storage 참조 생성
const storageRef = ref(storage, storagePath);

// Firebase Storage 업로드
await uploadBytes(storageRef, file);

// 다운로드 URL
const downloadURL = await getDownloadURL(storageRef);

console.log("Download URL :", downloadURL);

// Photo 객체 생성
const photo = createPhoto({

    photoId,

    owner,

    fileName: file.name,

    fileSize: file.size,

    mediaType: file.type.startsWith("video") ? "video" : "image",

    originalUrl: downloadURL,

    displayUrl: downloadURL,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()

});

console.log(photo);

// Firestore 저장
// Firestore 저장
await setDoc(
    doc(db, "photos", photoId),
    photo
);

// State 갱신
addPhoto(photo);

// 업로드된 Photo 반환
return photo;

}

export async function loadPhotos() {

    const q = query(
        collection(db, "photos"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const photos = snapshot.docs.map(doc => doc.data());

    setPhotos(photos);

    console.log(photos);

    return photos;

}

/**
 * Photo 삭제
 */
export async function deletePhoto() {

}

