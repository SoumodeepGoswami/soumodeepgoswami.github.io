// script.js

document.addEventListener("DOMContentLoaded", function () {
    let dark_mode_toggler = document.getElementById('dark_mode_toggler');
    let body = document.getElementsByTagName("body")[0];

    if (dark_mode_toggler) {
        dark_mode_toggler.addEventListener("click", () => {
            body.classList.toggle('dark-mode');
            body.classList.toggle('white-mode');
        });
    }
});