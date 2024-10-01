"use strict";

//Menu navegacion mobile

document.querySelector("#btn-menu").addEventListener("click", ampliarMenu);
function ampliarMenu() {
    document.querySelector(".menuSitio").classList.toggle("show");
}

