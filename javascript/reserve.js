// Sauvegarde le Nom et le Prénom

function SaveNmPm() {
    let form = document.querySelector("form");

    var Nom = form.nom.value;
    var Prenom = form.prenom.value;

    localStorage.setItem("nom", Nom);
    localStorage.setItem("prenom", Prenom);

    document.getElementById("prenom2").textContent = Prenom;
    document.getElementById("nom2").textContent = Nom;

    return Nom, Prenom;
}

// Sauvegarde les informations d'une stations

function SaveStation() {

    var stationNom = document.getElementById("nomStation").textContent;
    var stationVelo = document.getElementById("nombreVelos").textContent;
    var stationStatut = document.getElementById("statusStation").textContent;

    var e = stationVelo.split(" / ");
    var NbStationVelo = parseInt(e[0]) - 1;
    var NbStationVeloT = parseInt(e[1]);

    sessionStorage.setItem("NomStation", stationNom);
    sessionStorage.setItem("NbStationVelo", NbStationVelo);
    sessionStorage.setItem("NbStationVeloT", NbStationVeloT);
    sessionStorage.setItem("StatutStation", stationStatut);

    document.getElementById("quoi").textContent = stationNom;
}

function resetForm() {
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
}

// Test en deux étapes, 1: Test si un nom et un prénom se situent dans le locale storage, si oui les affiche; 2: Test si un chrono est lancé, si oui affiche la réservation

function TestForm() {
    localStorage.getItem("nom");
    localStorage.getItem("prenom");
    sessionStorage.getItem("NomStation");
    if (localStorage.getItem("nom") && localStorage.getItem("prenom")) {

        document.getElementById("nom").value = localStorage.getItem("nom");
        document.getElementById("prenom").value = localStorage.getItem("prenom");

        sessionStorage.getItem("minutes");
        sessionStorage.getItem("secondes");

        if (status) {
            document.getElementById("prenom2").textContent = localStorage.getItem("prenom");
            document.getElementById("nom2").textContent = localStorage.getItem("nom");

            document.getElementById("quoi").textContent = sessionStorage.getItem("NomStation");

            document.getElementById("reserve").style.display = "flex";
        }

    } else {
        document.getElementById("nom").value = "";
        document.getElementById("prenom").value = "";
    }
}

// Test si une sation et ses infos sont enrégistrées, si oui les affiche dans l'encart du formulaire prévu a cet effet

function TestStation() {
    sessionStorage.getItem("NomStation");
    sessionStorage.getItem("NbStationVelo");
    sessionStorage.getItem("NbStationVeloT");
    sessionStorage.getItem("StatutStation");

    if (sessionStorage.getItem("NomStation")) {
        document.getElementById("infosStation").style.display = "initial";
        document.getElementById("nomStation").textContent = sessionStorage.getItem("NomStation");
        document.getElementById("nombreVelos").textContent = sessionStorage.getItem("NbStationVelo") + " / " + sessionStorage.getItem("NbStationVeloT");
        document.getElementById("statusStation").textContent = sessionStorage.getItem("StatutStation");
        document.getElementById("buttonForm").disabled = false;
    }
}

// Test si le formulaire est rempli correctement

function myFormIsValid() {

    sessionStorage.getItem("count");

    let Velos = document.getElementById("nombreVelos").textContent;
    let e = Velos.split(" / ");
    let NbStationVelo = parseInt(e[0]) - 1;

    let count = sessionStorage.getItem("count");

    if (NbStationVelo >= 0) {
        if (document.getElementById("prenom").value != "") {
            if (document.getElementById("nom").value != "") {
                if (count != 0) {
                    return formIsValid = true;
                } else {
                    return formIsValid = false;
                }
            } else {
                return formIsValid = false;
            }
        } else {
            return formIsValid = false;
        }
    } else {
        return formIsValid = false;
    }
}

function Affichage() {
    TestStation();
    TestForm();
}
