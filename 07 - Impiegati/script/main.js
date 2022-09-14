var rigaSelezionata;

document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded () {
    document.forms["crud-form"].addEventListener("submit", inserisciDati);

    document.getElementById("get-simulation").addEventListener("click", aggiungiImpiegatiEsterni);
}

function inserisciDati (e) {
    e.preventDefault();

    let fullName = this["fullName"];
    let empCode = this["empCode"];
    let salary = this["salary"];
    let city = this["city"];

    if(controllaRequired(fullName)) {

        let nuovaRiga;

        if (rigaSelezionata == undefined) {
             nuovaRiga = document.querySelector("#employeeList thead").appendChild(document.createElement("tr"));
        }
        else {
            nuovaRiga = rigaSelezionata;
            rigaSelezionata = undefined;
        }

        nuovaRiga.innerHTML =`
                <td>${fullName.value}</td>
                <td>${empCode.value}</td>
                <td>${salary.value}</td>
                <td>${city.value}</td>
                <td><a class = "modifica" >Modifica</a><a class = "elimina">Elimina</a></td>
            `
        this.reset();
    }

    azioneSuRiga();

}

function azioneSuRiga () {
    for (const item of document.querySelectorAll(".modifica")) {
        item.addEventListener("click", modificaRiga);
    };

    for (const item of document.querySelectorAll(".elimina")) {
        item.addEventListener("click", eliminaRiga);
    };
}

function controllaRequired (nome) {

    if(nome.value.length == 0) {
        document.getElementById("fullNameValidationError").classList.remove("hide");
        return false;
    }
    else {
        document.getElementById("fullNameValidationError").classList.add("hide");
        return true;
    }

}

function modificaRiga () {
    rigaSelezionata = this.closest("tr");

    document.querySelectorAll("form input[type = \"text\"").forEach(function(item, i) {
       item.value = rigaSelezionata.cells[i].innerHTML;
    });
}

function eliminaRiga () {
    let rigaSelezionata = this.closest("tr");

    if(confirm("Sei sicuro di voler eliminare questa voce?")) {
        rigaSelezionata.closest("table").deleteRow(rigaSelezionata.rowIndex);
    }
    else {
        return;
    }
}

function aggiungiImpiegatiEsterni () {

    document.getElementById("get-simulation").disabled = true;

    let impiegatiAnzianitaMaggioreOtto = employees.filter(function(item) {
        return item.anzianita > 8;
    });

    for (let item of impiegatiAnzianitaMaggioreOtto) {

        item.salary += item.salary/100*20;

        let nuovaRiga = document.querySelector("#employeeList thead").appendChild(document.createElement("tr"));

        nuovaRiga.innerHTML =`
                <td>${item.fullName}</td>
                <td>${item.empCode}</td>
                <td>${item.salary}</td>
                <td>${item.city}</td>
                <td><a class = "modifica">Modifica</a><a class = "elimina">Elimina</a></td>
                `
    }; 

    azioneSuRiga();
    
}