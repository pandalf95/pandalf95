document.addEventListener("DOMContentLoaded",function(){

modulo.onsubmit = function (e) {

    e.preventDefault();

    let campi = document.querySelectorAll("#modulo input[type = \"text\"]");
    let checkBox = document.getElementById("privacy");
    let errori = document.querySelectorAll(".errore"); //uso un array per controllare tramite la sua length se sono presenti errori
    let empty = false;  //uso un boolean per controllare che ci siano o meno campi vuoti

    for (let i = 0; i < campi.length; i++) {

        if (campi[i].value.length == 0) {
            campi[i].classList.add("errore");
            campi[i].nextElementSibling.innerHTML = "Questo campo è obbligatorio";
            empty = true;
        }
        else if (!controllaCampo(campi[i], i)) {
            campi[i].classList.add("errore");
            campi[i].nextElementSibling.innerHTML = "Valore non valido";
        }
        else {
            campi[i].classList.remove("errore");
            campi[i].nextElementSibling.innerHTML = "";
        }

    }  // controllo i tre campi contemporaneamente sia dall'esere vuoti che non validi

    if (!checkBox.checked) {
        checkBox.nextElementSibling.nextElementSibling.innerHTML = "Devi accettare le condizioni di utilizzo";
    }
    else {
        checkBox.nextElementSibling.nextElementSibling.innerHTML = "";
    } // controllo che la spunta della chechbox sia attiva


    if (errori.length == 0 && checkBox.checked && !empty) {

        modulo.style.display = "none";
        card.style.display = "block";

        document.querySelector(".nome span").innerHTML = campi[0].value;
        document.querySelector(".mail span").innerHTML = campi[1].value;
        document.querySelector(".phone span").innerHTML = campi[2].value;

        immagineRandom();

    } // mi assicuro che nessun campo sia vuoto, che siano tutti validi e che la spunta sia attivata così da procedere alla formazione della carta

}

});//DOMContentLoaded

function controllaCampo (campo, tipo) {

    if (tipo == 0) {
        return /^(?=.{3,50}$)[a-zA-Z ]+$/.test(campo.value);  //regex Nome, l'ho modificata spero funzioni bene
    }
    else if (tipo == 1) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(campo.value); //regex mail
    }
    else {
        return /^3[0-9]{8,9}$/.test(campo.value); //regex numero telefono
    }
   
} // do in input il campo da controllare e tramite l'indice del ciclo controllo anche se è nome, mail o telefono così da restituire la giusta regex testata

function immagineRandom () {

    let numero = Math.floor(Math.random()*4 + 1);
    numero = numero.toString();

    let immagine = document.querySelector("#card img");

    immagine.setAttribute("src", immagine.getAttribute("src").replace("1", numero));
    
} // estraggo un numero random tra 1 e 4, lo converto in stringa e lo sostituisco nell' src dell'immagine