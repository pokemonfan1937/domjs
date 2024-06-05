import {card, createCard} from './card.js';
import {cardarea} from './cardarea.js'

export class pile extends cardarea{
    constructor(cards, areaname){
        super(cards, areaname);
    }
}

export function createPile(allcards, prior, cardtext, piles) {
    let i = prior;
    for (i = prior; i < cardtext.count + prior; i++){
        allcards.push(createCard(i, cardtext, 3));
    }
    piles.push(new pile(allcards.slice(prior, i), allcards[prior].name));
    return i;
}

export function frompiletohere(cardpile, cardarea1, id){
    if (cardpile.id(0) != id){
        console.log("Couldn't move card");
        return;
    }
    else{
        let x = cardpile.cards.splice(0, 1)[0];
        cardarea1.cards.push(x);

    }
}

export function rotatePile(cardpile){
    let x = cardpile.name(0);
    let y = 0;
    while (x == cardpile.name(0)){
        cardpile.push(cardpile.shift());
    }
}