var pokemonInPagina = [];

document.addEventListener("DOMContentLoaded", () => {

    caricaPokemon(`https://pokeapi.co/api/v2/pokemon?offset=$0&limit=30`);

    document.getElementById("home").onclick = () => {
        caricaPokemon(`https://pokeapi.co/api/v2/pokemon?offset=$0&limit=30`);
        mostra(document.getElementById("next"));
        mostra(document.getElementById("next2"));
    }

    document.forms[0].addEventListener("submit", e => {
        e.preventDefault();

        cercaPokemon();
    })

    window.addEventListener("scroll", () => {
        if (window.scrollY > 800) {
            mostra(document.getElementById("su"));
        }
        else {
            nascondi(document.getElementById("su"));
        }
    });

    document.getElementById("su").onclick = function() {
        scrollTo(0,0);
    }
});

function cercaPokemon () {

    const pokemonDaCercare = document.getElementById("cerca").value;

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonDaCercare}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then (pokemonTrovato => {
                document.getElementById("lista").innerHTML = creaCard(pokemonTrovato, true);
                pokemonInPagina = [];
                pokemonInPagina.push(pokemonTrovato);
                shiny();
                nascondi(document.getElementById("next"));
                nascondi(document.getElementById("prev"));
                nascondi(document.getElementById("prev2"));
                nascondi(document.getElementById("next2"));
            })
}

function nascondi (elemento) {
    elemento.classList.add("hide");
}

function mostra (elemento) {
    elemento.classList.remove("hide");
}

function caricaPokemon (url) {
    
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(listaPokemon => {
            //console.log(listaPokemon)
            listaPokemon.previous === null ? nascondi(document.getElementById("prev")) : mostra(document.getElementById("prev"));
            listaPokemon.previous === null ? nascondi(document.getElementById("prev2")) : mostra(document.getElementById("prev2"));

            const {results} = listaPokemon;

            espandi(results);

            if (listaPokemon.previous !== null) {
                controllaBottoni("prev", listaPokemon.previous);
                controllaBottoni("prev2", listaPokemon.previous);
            }

            controllaBottoni("next", listaPokemon.next);
            controllaBottoni("next2", listaPokemon.next);
        })

};

function controllaBottoni (id, link) {

    document.getElementById(id).onclick = function() {
        pokemonInPagina = [];
        caricaPokemon(link);
    }
}


async function espandi (listaPokemon) {

    for (let pokemon of listaPokemon) {

        await fetch(pokemon.url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(singoloPokemon => {
                //console.log(singoloPokemon)
                creaCard(singoloPokemon);
                
                shiny();
               
            });

    }

}

var contatore = 0;

function creaCard (pokemon, cerca=false) {

    pokemonInPagina.push(pokemon);

    let card = `
                <div class = "col-sm col-md-6 col-lg-4 mt-3 mb-2 d-flex justify-content-center">
                    <div class="card text-white bg-dark" style="width: 18rem;">
                        <h5 class="card-title p-2"><b>#${pokemon.id}</b> ${pokemon.name.toUpperCase()}</h5>
                        <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item list-group-item-info"><b>Tipo:</b> ${mostraTipo(pokemon)}</li>
                                <li class="list-group-item list-group-item-info">${mostraStats(pokemon)}</li>
                                <li class="list-group-item list-group-item-info"><b>Abilità:</b> ${mostraAbilita(pokemon)}</li>
                            </ul>
                        <div class = "row">
                            <div class="col-4">
                                <button type="button" class="btn btn-primary mt-2 shiny">Shiny</button>
                            </div>
                            <div class="col-4 d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary mt-2 normale">Normale</button>
                            </div>
                            
                        </div>
                     </div>
                </div>
            </div>
            `


    if (cerca == false) {

        contatore++;

        if (contatore == 31) {
            document.querySelector("#lista").innerHTML = "";
            contatore = 1;
        }

        document.querySelector("#lista").innerHTML += card
    }
    else return card;

}

function mostraTipo (pokemon) {
    
    let tipi = "";

    for (let tipo of pokemon.types) {
        tipi +=  tipo.type.name + " ";
    }

    return tipi;
}

function mostraStats (pokemon) {

    let statistiche = ""

    for (let stat of pokemon.stats) {
        statistiche += `<b>${stat.stat.name.toUpperCase()}</b> : ${stat.base_stat}<br>`
    }

    return statistiche;

}

function mostraAbilita (pokemon) {

    let skills = "";

    for (let abilita of pokemon.abilities) {
        skills += `<b>[</b>${abilita.ability.name}<b>]</b> `
    }

    return skills;


}

function shiny () {

    const tasti = document.querySelectorAll("button.shiny");

    tasti.forEach(function(tasto, i) {
        
            tasto.onclick = function() {
                document.querySelectorAll(".card-img-top")[i].src = pokemonInPagina[i].sprites.front_shiny;
            }

    })

    const tasti2 = document.querySelectorAll("button.normale");

    tasti2.forEach(function(tasto, i) {
        
        tasto.onclick = function() {
            document.querySelectorAll(".card-img-top")[i].src = pokemonInPagina[i].sprites.front_default;
        }

    })
}