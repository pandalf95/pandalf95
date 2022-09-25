import {apiKey, basicUrlGeo, basicUrlMeteo} from "./costanti.js";
import {Posto} from "./classePosto.js"

$(function() {

    caricaNazioni();

    $("#inserisciDati").on("submit", e => ricavaCoordinate(e));

    $("#inserisciDati button")[1].addEventListener("click", () => {
        $("#risultato").addClass("hide");
        $("span").addClass("hide");
    });
});

function caricaNazioni() {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4 && xhr.status === 200) {
            const nazioni = JSON.parse(xhr.responseText);

            let opzioni = "<option selected value=''>Scegli la nazione</option>";

            for (let i in nazioni) {
    
                opzioni += `
                <option value = "${nazioni[i].iso3361_2_characters}">${nazioni[i].italian_country_name_1 != undefined ? nazioni[i].italian_country_name_1 : nazioni[i].english_country_name}</option>
                `
            }

            $("#paesi").html(opzioni);
    
        }

    }

    xhr.open ("GET", "./nazioni.json");
    xhr.send();
}

function ricavaCoordinate (e) {

    e.preventDefault();

    const cittaSelezionata = $("#città").val();
    const nazioneSelezionata = $("#paesi").find(":selected").val();

    //MI RICAVO LATITUDINE E LONGITUDINE DELLA CITTA SELEZIONATA PER POTERLE USARE POI PER RICAVARE IL METEO

    $.get(cittaSelezionata!= "" ? `${basicUrlGeo}direct?q=${cittaSelezionata},${nazioneSelezionata}&appid=${apiKey}` : `${basicUrlGeo}direct?q=${nazioneSelezionata}&appid=${apiKey}`)
        .done(response => {

            let latitudine;
            
            try {
                latitudine = response[0].lat;
            }
            catch (e) {
                $("span").removeClass("hide").html("Inserisci una città valida");
                $("#risultato").addClass("hide");
                throw new Error(e);
            }
            
            $("span").addClass("hide");

            let longitudine = response[0].lon;

            let postoSelezionato = new Posto (cittaSelezionata, nazioneSelezionata, latitudine, longitudine);

            ricavaInfoMeteo(postoSelezionato);
        })
        .fail (error => {
            $("span").removeClass("hide").html("Error 400 - Bad Request | Inserisci almeno una città o una nazione");
            $("#risultato").addClass("hide");
        })

}

function ricavaInfoMeteo (posto) {

    //FACCIO LA RICHIESTA EFFETTIVA PER IL METEO
    
    $.get(`${basicUrlMeteo}?lat=${posto.latitudine}&lon=${posto.longitudine}&appid=${apiKey}`)
        .done(response => {

            //console.log(response);
            posto.meteo.situazione = response.weather[0].description;
            posto.meteo.velocitaVento = response.wind.speed;
            posto.meteo.pressione = response.main.pressure;
            posto.meteo.temperatura = response.main.temp;
            posto.meteo.temperaturaMax = response.main.temp_max;
            posto.meteo.temperaturaMin = response.main.temp_min;
            posto.meteo.umidita = response.main.humidity;
            //console.log(posto)
            mostraMeteo(posto);

        })
        .fail (error => {
            console.log(error)
        })
}

function mostraMeteo(posto) {

    $("#risultato").removeClass("hide");

    $("#risultato h2").html(`${posto.citta.toUpperCase()} - ${posto.nazione}`);
    $("#risultato h3").html(`${(posto.meteo.temperatura - 273.15).toFixed(2)}° | ${posto.meteo.situazione}`);

    $("#minmax tbody tr").html(`<td>${(posto.meteo.temperaturaMin - 273.15).toFixed(2)}°</td><td>${(posto.meteo.temperaturaMax - 273.15).toFixed(2)}°</td>`);

    $("#risultato ul").html(`<li><img src="immagini/wind.png" alt="Vento">${posto.meteo.velocitaVento} m/s</li>
                             <li><img src="immagini/pressure.png" alt="Pressione">${posto.meteo.pressione} mbar</li>
                             <li><img src="immagini/humidity.png" alt="Umidità">${posto.meteo.umidita}%</li>`);


}