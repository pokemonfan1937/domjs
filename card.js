import * as cardtext from './cardtext.js';

export class card {

    constructor(id, cardtext, faceup){
        this.id = id;
        this.cardtext = cardtext;
        this.name = cardtext.name;
        this.effect = cardtext.effect;
        this.types = cardtext.types;
        this.cost = cardtext.cost;
        this.text = cardtext.text;
        this.faceup = faceup;
    }
    play(){
        cardtext.effect;
    }
}

export function checktype(card, type){
    if (card.types.includes(type)){
        return true;
    }
    else{
        return false;
    }
}

export function checkcost(card, cost){
    if (card.cost[0] <= card.cost[0] && card.cost[1] <= cost[1] && card.cost[2] <= cost[2]){
        return true;
    }
    else{
        return false;
    }
}
