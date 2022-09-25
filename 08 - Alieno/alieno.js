document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded () {
    inizializza.addEventListener("click", inizializzaAlieno);
}

function inizializzaAlieno () {

    let nomeInserito = document.getElementById("nome").value;
    let viteInserite = +document.getElementById("vite").value;

    let nuovoAlieno;

    try {
        nuovoAlieno = new Alieno(nomeInserito, viteInserite);
        document.querySelector("#interfaccia span").classList.add("nascondi");
        console.log(nuovoAlieno)
    }
    catch (e) {
        document.querySelector("#interfaccia span").classList.remove("nascondi");
        throw new Error(e);
    }
    

    this.disabled = true;

    for (let item of document.querySelectorAll("#interfaccia input")) {
        item.disabled = true;
    }

    document.getElementById("armiAggiuntive").classList.remove("nascondi");

    inserisciDati(nuovoAlieno);
}

function inserisciDati (alieno) {

    let righeAttributi = document.querySelectorAll("#attributiAlieno table tr");

    
    righeAttributi[0].cells[1].textContent = alieno.nome;
    righeAttributi[1].cells[1].textContent = alieno.vite;
    righeAttributi[2].cells[1].textContent = alieno.getGruppoSanguigno();

    for (let item of alieno.armi) {
        let nuovaImg = righeAttributi[3].cells[1].appendChild(document.createElement("img"))
        nuovaImg.src = `immagini/${item}.jpeg`
    }

    
    document.getElementById("vitepiu").addEventListener("click", () => {
        try {
            alieno.modificaVite(1);
            righeAttributi[1].cells[1].textContent = alieno.vite;
            document.querySelector("#interfaccia span").classList.add("nascondi");
            console.log(alieno)
        }
        catch (e) {
            document.querySelector("#interfaccia span").classList.remove("nascondi");
            throw new Error(e);
        }  
    });
    

    document.getElementById("vitemeno").addEventListener("click", () => {
        try {
            alieno.modificaVite(-1);
            righeAttributi[1].cells[1].textContent = alieno.vite;
            document.querySelector("#interfaccia span").classList.add("nascondi");
            console.log(alieno)
        }
        catch (e) {
            document.querySelector("#interfaccia span").classList.remove("nascondi");
            throw new Error(e);
        }  
    });

    armiAggiuntive(alieno, righeAttributi);
}

function armiAggiuntive (alieno, riga) {

    document.querySelectorAll("#armiAggiuntive img").forEach(function(item) {

        item.addEventListener("click", () => {
            item.classList.add("nascondi");
            let armaDaAggiungere = item.src.split("/").pop().split(".", 1);
            alieno.aggiungiArmi(armaDaAggiungere[0]);
            let nuovaImg = riga[3].cells[1].appendChild(document.createElement("img"));
            nuovaImg.src = `immagini/${alieno.armi[alieno.armi.length-1]}.jpeg`
            console.log(alieno)
        })

    })
   
}

class Alieno {

    #gruppoSanguigno = "xyz";
    armi = ["aug", "laser-beam"];

    constructor (nome, vite) {
        this.nome = nome;
        this.vite = vite;
    }

    set nome (nome) {
        if (nome === "") {
            this._nome = "Alieno Senza Nome"
        }
        else {
            this._nome = nome;
        }
    }

    get nome () {
        return this._nome;
    }

    set vite (vite) {

        if (vite > 0 && vite <= 50 && Number.isInteger(vite)) {
            this._vite = vite;
        }
        else {
            throw "Valore vite non valido | Solo numeri interi da 1 a 50";
        }
    }

    get vite () {
        return this._vite;
    }

    getGruppoSanguigno() {
        return `Il mio gruppo sanguigno è "${this.#gruppoSanguigno}": posso darlo solo ad \"abc\" ma ricevo da tutti`;
    }

    aggiungiArmi(arma) {
        this.armi.push(arma);
    }

    modificaVite(vite) {
        this.vite += vite;
    }
}
