let user = "Lion";
let text1 = "Mow";

function showPuzzle(text) {
    if (user == "Lion") {
        text = "Mrowl."
    }

    document.getElementById("secret1").textContent=text;
}


window.onload = showPuzzle(text1);