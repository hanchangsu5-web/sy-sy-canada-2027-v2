/**
 * ==========================================================
 * Travel Gallery V2
 * App
 * ----------------------------------------------------------
 * 프로그램 시작점
 * ==========================================================
 */

import { loadPhotos } from "./photoService.js";
import { initGallery } from "./gallery.js";
import { initViewer } from "./viewer.js";

/**
 * 앱 시작
 */
export async function initApp() {

    console.log("initApp 시작");

    await loadPhotos();

    console.log("loadPhotos 완료");

    initGallery();

    initViewer();

    console.log("Travel Gallery V2 시작");

}

initApp();