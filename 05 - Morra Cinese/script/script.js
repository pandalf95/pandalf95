let sceltaCpu, sceltaUtente;
let punteggioUtente = 0;
let punteggioCpu = 0;

document.addEventListener("DOMContentLoaded", function() {

    inizia.onclick = function () {
        scelta.style.display = "block";
        this.style.display = "none";  
        logo.style.display = "none";
        home.style.display = "block";
        pUtente.innerHTML = punteggioUtente;
        pCpu.innerHTML = punteggioCpu;
    }

    home.onclick = function () {
        punteggioUtente = 0;
        punteggioCpu = 0;
        pUtente.innerHTML = "";
        pCpu.innerHTML = "";
        this.style.display = "none";
        logo.style.display = "block";
        inizia.style.display = "block";
        scelta.style.display = "none";
        esito.style.display = "none";
        riprova.style.display = "none";
    }


    let arrayImg = document.querySelectorAll("#scelta img");

    for (let i = 0; i < arrayImg.length; i++) {

        arrayImg[i].onclick = function () {

            sceltaUtente = i;
            utente.setAttribute("src", this.getAttribute("src"));
            sceltaRandom();

            scelta.style.display = "none";
            esito.style.display = "block";
            riprova.style.display = "block";

            controllo();

            pUtente.innerHTML = punteggioUtente;
            pCpu.innerHTML = punteggioCpu;
            
        }
    }

    riprova.onclick = function() {
        scelta.style.display = "block";
        this.style.display = "none"; 
        esito.style.display = "none";

    }

}); //DOMContentLoaded

function sceltaRandom () {

    sceltaCpu = Math.floor(Math.random()*5);

    if (sceltaCpu == 0) {
        cpu.setAttribute("src", sasso.getAttribute("src"));
    }
    else if (sceltaCpu == 1) {
        cpu.setAttribute("src", carta.getAttribute("src"));
    }
    else if (sceltaCpu == 2) {
        cpu.setAttribute("src", forbici.getAttribute("src"));
    }
    else if (sceltaCpu == 3) {
        cpu.setAttribute("src", lizard.getAttribute("src"));
    }
    else {
        cpu.setAttribute("src", spock.getAttribute("src"));
    }
}


function controllo () {

    if (sceltaUtente == sceltaCpu) {
        messaggio.innerHTML = "Partita patta!"
    }
    else if (sceltaUtente == 0 && (sceltaCpu == 3 || sceltaCpu == 2)) {
        messaggio.innerHTML = "Hai vinto!"
        punteggioUtente++;
    }
    else if (sceltaUtente == 1 && (sceltaCpu == 0 || sceltaCpu == 4)) {
        messaggio.innerHTML = "Hai vinto!"
        punteggioUtente++;
    }
    else if (sceltaUtente == 2 && (sceltaCpu == 1 || sceltaCpu == 3))
    {
        messaggio.innerHTML = "Hai vinto!"
        punteggioUtente++;
    }
    else if (sceltaUtente == 3 && (sceltaCpu == 4 || sceltaCpu == 1)) {
        messaggio.innerHTML = "Hai vinto!"
        punteggioUtente++;
    }
    else if (sceltaUtente == 4 && (sceltaCpu == 2 || sceltaCpu == 0)) {
        messaggio.innerHTML = "Hai vinto!"
        punteggioUtente++;
    }
    else {
        messaggio.innerHTML = "Hai perso!"
        punteggioCpu++;
    }
}
