// Initialistion de la page, vérifie si un chrono existe déjà; si oui, il est relancé; sinon il est initialisé avec des valeurs par défauts. Initialise la variable test de formulaire.

let status = sessionStorage.getItem("status");

Affichage();

let minutes = parseInt(sessionStorage.getItem("minutes"));
let secondes = parseInt(sessionStorage.getItem("secondes"));

if (status) {
    var newChrono = new Chrono(minutes, secondes, 1000);
    newChrono.start();
} else {
    var newChrono = new Chrono(20, 0, 1000);
}

var fromIsValid = false;

// Crée et lance le diaporama

var Sliders = new Diaporama(1, 5000);

Sliders.allInOne();

// Gère l'écoute des boutons du diaporama

document.getElementById("actif").addEventListener("click", (event) => {
    let button = event.target;
    Sliders.showCurrent(button.id);
});

document.getElementById("droite").addEventListener("click", (event) => {
    Sliders.nextImg();
});

document.getElementById("gauche").addEventListener("click", (event) => {
    Sliders.prevImg();
});

document.addEventListener("keydown", (event) => {
    let keyName = event.key;
    if (keyName === 'ArrowLeft') {
        Sliders.prevImg();
    } else if (keyName === 'ArrowRight') {
        Sliders.nextImg();
    }
});

document.getElementById("pauseButton").addEventListener("click", (event) => {
    Sliders.diapPause();
});

document.getElementById("playButton").addEventListener("click", (event) => {
    Sliders.diapAuto();
});

// Gère le bouton de réservation

document.getElementById("buttonForm").addEventListener("click", (event) => {

    event.preventDefault();
    myFormIsValid();

    if (myFormIsValid()) {
        SaveNmPm();
        SaveStation();

        newChrono.reset();
        newChrono.start();

        sessionStorage.setItem("status", true);
        Affichage();
        resetCtx();
        document.getElementById("reserve").style.display = "flex";
        formIsValid = "";

        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }

});

// Reset le formulaire

document.getElementById("reset").addEventListener('click', (e) => {
    resetCtx();
    resetForm();
});
