"use strict";

// Classes, functions, etc.

class Secret {
    constructor(newAnswer, newHint, status) {
        this.answer = newAnswer; // string
        this.hint = newHint; // hints can be either strings or Secrets
        this.solved = status; // bool
    }
}

let user = "Mystery Creature";
let text1 = "Mow";

// function showPuzzle(text) {
//     // if (user == "Lion") {
//     //     text = "Mrowl.";
//     // }

//     document.getElementById("secret1").textContent=text;
//     document.getElementsByTagName
// }

function beginPuzzle(secrets) {
    let lionPuzzles = document.getElementsByClassName("lion puzzle");
    for (let puzzle of lionPuzzles) {
        puzzle.style.display = "block";
    }
}

function verifyUser() {
    let startText = "Are you the birthday Lion?\n\n\
        Name this substance to prove your identity."
    let solution = "chemistry"
    document.getElementById("start").textContent=startText;
    
    let verifyResponse = document.getElementById("verifyInput");

    verifyResponse.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            if (verifyResponse.value === "Mrowl." || 
                verifyResponse.value === solution
            ) {
                startText = "Secrets await you, Lion.";
                user = "Lion";
            }
            else {
                startText = "Probable non-Lion detected. Less fancy secrets await you."
            }
            document.getElementById("start").textContent=startText;
            
            // verifyResponse.value = "";
            verifyResponse.style.display = "none";
        }
    })
    
}

function incipiatFestum(){
    let lionSecrets = [];
    let creatureSecrets = [];
    let unsolvedSecrets = [];
    
    verifyUser();
    
    if (user == "Lion") {
        unsolvedSecrets = lionSecrets;
    }
    else {
        unsolvedSecrets = creatureSecrets;
    }

    beginPuzzle(unsolvedSecrets);
}

// The fun part of the script



window.onload = incipiatFestum();