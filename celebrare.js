"use strict";

// Classes, functions, etc.

class Secret {
    constructor(newAnswer, newHints) {
        this.answer = newAnswer; // string
        this.hintsList = newHints; // list of hints
        this.solved = false; // bool
        this.unsolvedSecrets = [];
        this.parentSecret = null;
        this.parentDiv = null;
        
        for (let item of this.hintsList) {
            if (item instanceof Secret) {
                this.unsolvedSecrets.push(item);
                item.parentSecret = this;
            }
        }
    }
    
    parseSecrets(hintString) {
        // To be implemented at a future time
    }

    // Returns the current corresponding string for the secret
    inWriting() {
        if (this.solved) {
            return this.answer;
        }
        else {
            let displaySecret = "[";

            for (let item of this.hintsList) {
                if (typeof item == "string") {
                    displaySecret += item;
                }
                else if (item instanceof Secret) { // we *should* have an object at this point...
                    displaySecret += item.inWriting();
                }
                else {
                    console.log("Error: unexpected data type in hintsList.\n");
                }
            }

            return displaySecret + "]";
        }
    }
}


let user = "Mystery Creature";
let verified = false;

let lionSecrets = [];

let plantSecret = new Secret(
    "cattail",
    [
        "This fluffy riparian feline ap",
        new Secret(
            "end",
            [
                "the farthest point from the beginning"
            ]
        ),
        "age sounds like it be",
        new Secret(
            "long",
            [
                "lomg, tran",
                new Secret(
                    "slate",
                    [
                        "the finest-grained foliated metamorphic rock, per Wikipedia"
                    ]
                ),
                "d for normies"
            ]
        ),
        "s in Animalia, but can also be found in Plantae."
    ]
)
lionSecrets.push(plantSecret);

let creatureSecrets = [];

// creatureSecrets go here

let unsolvedSecrets = []; // a set of either lion or creature secrets
let activeSecrets = []; // the set of all active secrets from an entire set

function findTop(currSecret) {
    if (currSecret.parentSecret == null){
        return currSecret;
    }
    else {
        return findTop(currSecret.parentSecret);
    }
}

function findActiveSecrets(currSecret){
    if (!currSecret.solved) {
        if (currSecret.unsolvedSecrets.length > 0) {
            for (let unsolved of currSecret.unsolvedSecrets) {
                findActiveSecrets(unsolved);
            }
        }
        else {
            activeSecrets.push(currSecret);
        }
    }
}

function beginDeciphering(unsolvedSecrets) {
    for (let majorSecret of unsolvedSecrets) {
        findActiveSecrets(majorSecret);
    }
}

function waitFor(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

function identifyUser() {
    let startText = "Are you the birthday Lion?\n\nName this substance to prove your identity."
    let solution = "chemistry"
    document.getElementById("start").textContent=startText;
    
    let textInput = document.getElementById("textInput");

    textInput.addEventListener("keydown", async function (e) {
        if (e.key === "Enter" && !verified) {
            if (textInput.value == "Mrowl." || 
                textInput.value == solution
            ) {
                startText = "Secrets await you, Lion.";
                user = "Lion";
            }
            else {
                startText = "Probable non-Lion detected. Less fancy secrets await you."
            }
            document.getElementById("start").textContent=startText;
            
            textInput.value = "";
            textInput.style.display = "none";
            inputBox.style.display = "none";

            await waitFor(2000);

            textInput.style.display = "block";
            inputBox.style.display = "block";
            textInput.focus();

            // Input validation complete, setup puzzles & begin


            if (user == "Lion") {
                unsolvedSecrets = lionSecrets;

                let puzzles = document.getElementsByClassName("puzzle");
                for (let i = 0; i < puzzles.length; i++) {
                    puzzles[i].style.display = "block";
                    if (i == 0) {
                        puzzles[i].textContent = unsolvedSecrets[i].inWriting();
                        unsolvedSecrets[i].parentDiv = puzzles[i];
                    }
                }
            }
            else {
                unsolvedSecrets = creatureSecrets;
            }
            
            verified = true;
            beginDeciphering(unsolvedSecrets);
        }
        else if (e.key === "Enter" && verified) {
            let guess = textInput.value;
            // debugger;

            for (let active of activeSecrets) {
                if (guess == active.answer) {
                    // mark as solved
                    active.solved = true;

                    if (active.parentSecret !== null) {
                        // update parent's list of unsolved secrets
                        active.parentSecret.unsolvedSecrets =
                            active.parentSecret.unsolvedSecrets.filter(item => item !== active);

                        // if parent has no more unsolved secrets, make it active
                        if (active.parentSecret.unsolvedSecrets.length == 0) {
                            activeSecrets.push(active.parentSecret);
                        }
                    }

                    // update text on page
                    let top = findTop(active);
                    top.parentDiv.textContent = top.inWriting();
                    break;
                }
            }

            textInput.value = "";
            textInput.focus();
        }
    })
}

function incipiatFestum(){
    // Clear forms
    document.getElementById("inputBox").value = "";

    identifyUser();
}

// The fun part of the script



window.onload = incipiatFestum();