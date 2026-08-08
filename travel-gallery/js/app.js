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

/**
 * 앱 시작
 */
export async function initApp() {

    await loadPhotos();

    initGallery();

    console.log("Travel Gallery V2 시작");

}