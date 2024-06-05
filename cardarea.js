

export class cardarea {
    constructor(cards, areaname){
        this.cards = cards;
        this.areaname = areaname;
    }
    id(i = 0){
        return this.cards[i].id;
    }
    card(i = 0){
        return this.cards[i];
    }
    name(i = 0){
        return this.cards[i].name;
    }
    effect(i = 0){
        return this.cards[i].effect;
    }
    types(i = 0){
        return this.cards[i].types;
    }
    cost(i = 0){
        return this.cards[i].cost;
    }
    text(i = 0){
        return this.cards[i].text;
    }
    count(){
        return this.cards.length;
    }
    faceup(i = 0){
        return this.cards[i].faceup;
    }
    stringform(){
        let temp = "";
        for (let i = 0; i < this.cards.length; i++){
            temp = temp + this.cards[i].name + "<button id=" + this.cards[i].id + " hidden >"  + this.cards[i].name + "</button>" + "<br>"; 
        }
        if (temp == ""){
            return "Nothing\n";
        }
        else{
            return temp;
        }
    }
}



export function fromheretothere(cardarea1, cardarea2, id){
    let notfound = true;
    let i = 0;
    for (i = 0; i < cardarea1.count(); i++){
        if (cardarea1.id(i) == id){
            notfound = false;
            break;
        }
    }
    if (notfound){
        console.log("Couldn't move card");
        return;
    }
    else{
        let x = cardarea1.cards.splice(i, 1)[0];
        cardarea2.cards.push(x);
    }
}

