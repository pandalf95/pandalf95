document.addEventListener("DOMContentLoaded", function() {

    var you = 0;
    var cpu = 0;

    document.getElementById("gioca").onclick = function() {
        
        var num1 = Math.floor(Math.random()*10+1);
        var num2 = Math.floor(Math.random()*10+1);
    
        document.getElementById("you").innerHTML = "<span>" + num1 + "</span>";
        document.getElementById("cpu").innerHTML = "<span>" + num2 + "</span>";

        if (num1 > num2) {
            document.getElementById("messaggio").innerHTML = "Complimenti, hai vinto!";  
            you += 1;
        }
        else if (num1 < num2) {
            document.getElementById("messaggio").innerHTML = "Mi dispiace, hai perso!";
            cpu += 1;
        }
        else {
            document.getElementById("messaggio").innerHTML = "Partita patta!";
            you += 1;
            cpu += 1;
        }

        document.getElementById("punt1").innerHTML = you;
        document.getElementById("punt2").innerHTML = cpu;
    }

    document.getElementById("reset").onclick = function() {
        
        document.getElementById("you").innerHTML = "<span></span>";
        document.getElementById("cpu").innerHTML = "<span></span>";
        document.getElementById("messaggio").innerHTML = "";
        you = 0;
        cpu = 0;
        document.getElementById("punt1").innerHTML = you;
        document.getElementById("punt2").innerHTML = cpu;
    }
    
} );