document.addEventListener("DOMContentLoaded", () => {

    let chiudiVideo = document.querySelector("#popupTarget a");

    chiudiVideo.onclick = () => {
        document.querySelector("#popupTarget #video-container video").pause();
    }

})