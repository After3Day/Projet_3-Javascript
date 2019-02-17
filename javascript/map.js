// Création de la carte

var myMap = L.map('mapid').setView([45.764127, 4.835783], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXBhc2NoZSIsImEiOiJjam44aDU0enAxZDRrM3BzN2xod3c0MW9vIn0.xCfwLwr0dnb74ubmp7chJg'
}).addTo(myMap);

let newRequest = new Appel("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=914714b14a151358518b458dd4a1b81f459d5e80");

let tableauStation = [];


newRequest.newReq(newRequest.Url).then(function (response) {

    var data = JSON.parse(response);

    // Récupère les donnèes du JSON et place les informations utiles dans un objet "station", puis les place dans un tableau.

    data.forEach(function (info) {

        var station = {
            stationName: info.name,
            stationPos: info.position,
            nbrMaxVelos: info.bike_stands,
            retourVelo: info.available_bike_stands,
            nbrVelos: info.available_bikes,
            status: info.status
        };

        tableauStation.push(station);

        // Créer un marqueur personalisé en fonction du nombre de velo

        let markerCustom;

        if (station.nbrVelos === 0) {
            markerCustom = L.AwesomeMarkers.icon({
                icon: 'bicycle',
                prefix: 'fa',
                markerColor: 'black'
            });
        } else if (station.nbrVelos < 5) {
            markerCustom = L.AwesomeMarkers.icon({
                icon: 'bicycle',
                prefix: 'fa',
                markerColor: 'red'
            });
        } else if (station.nbrVelos < 10) {
            markerCustom = L.AwesomeMarkers.icon({
                icon: 'bicycle',
                prefix: 'fa',
                markerColor: 'orange'
            });
        } else {
            markerCustom = L.AwesomeMarkers.icon({
                icon: 'bicycle',
                prefix: 'fa',
                markerColor: 'green'
            });
        }

        // Récupère "XXXX - NOMDESATION" et ressort "Nomdestation"

        var NomStation = station.stationName;
        var SplitNS = NomStation.split("- ");
        var SpliceNS = SplitNS.splice(0, 1);
        var NomStationM = SplitNS.join("- ");
        var NomStationFinal = NomStationM.charAt(0) + NomStationM.slice(1).toLocaleLowerCase();

        // Affiche les marqueurs sur la carte et ajoute un popup lié avec le nom de la station

        marker = L.marker([station.stationPos.lat, station.stationPos.lng], {
            icon: markerCustom
        }).bindPopup(NomStationFinal).addTo(myMap);

        // Ecoute le clique sur le marqueur et affiche les différentes informations de la station dans l'encart prévu au dessus du formulaire

        marker.on("click", (event) => {
            document.getElementById("infosStation").style.display = "initial";
            document.getElementById("nomStation").textContent = NomStationFinal;
            document.getElementById("nombreVelos").textContent = station.nbrVelos + " / " + station.nbrMaxVelos;
            document.getElementById("statusStation").textContent = station.status;
            document.getElementById("buttonForm").disabled = false;
        });

        // Ouvre / Ferme le popup avec le nom de la station

        marker.on("mouseover", function (e) {
            this.openPopup();
        });

        marker.on("mouseout", function (e) {
            this.closePopup();
        });

    })

});
