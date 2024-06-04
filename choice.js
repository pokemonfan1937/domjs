import { buttonhandler, allcards, buttons, hideallbuttons, showsupply } from "./index.js";

var _choice

export async function choosefromSupply(type, cost){
    let card;
    var promise = new Promise((resolve) => {_choice = resolve})
    for (let i = 0; i < allcards.length; i++){
        buttons[i] = document.getElementById(allcards[i].id);
        if (buttons[i] != null){
            buttons[i].onclick = () => {
                _choice(allcards[i]);
                return allcards[i];
            }
        }
    }
    hideallbuttons();
    showsupply(type, cost);
    await promise.then((result) => {card = result})
    return card;

}

var choicebuttons = [];
choicebuttons[0] = document.getElementById("Choice 1");
choicebuttons[1] = document.getElementById("Choice 2");
choicebuttons[2] = document.getElementById("Choice 3");
choicebuttons[3] = document.getElementById("Choice 4");

function showchoices(n){
    for (let i = 0; i < n; i++){
        choicebuttons[i].hidden = false;
    }
}

function hidechoices(n){
    if (n == null){
        for (let i = 0; i < 4; i++){
            choicebuttons[i].hidden = true;
        }
    }
    else if(n != 5){
        choicebuttons[n].hidden = true;
    }
}


export async function chooseBetween(choices, number){
    let answer = [];
    let x = 5;
    var n = choices.length
    showchoices(n);
    for (let i = 0; i < number; i++){
        var promise = new Promise((resolve) => {_choice = resolve})
        var n = choices.length
        for (let j = 0; j < n; j++){
            if (choicebuttons[j] != null){
                choicebuttons[j].textContent = choices[j]
                choicebuttons[j].onclick = () => {
                    _choice(j);
                    return choices[j]
                }
            }
        }
        hideallbuttons();
        hidechoices(x);
        await promise.then((result) => {answer[i] = result})
        x = answer[i]
    }
    hidechoices();
    return answer
}