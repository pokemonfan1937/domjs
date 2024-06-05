import {pile, createPile} from './pile.js';
import * as cardtext from './cardcollection.js';

export function createKingdom(allcards, prior, piles){
    let x;
    let supplycards = [cardtext.Village, cardtext.Smithy, cardtext.WorkersVillage, cardtext.Laboratory, cardtext.Festival, cardtext.Market, cardtext.Bazaar, cardtext.Woodcutter, cardtext.GreatHall, cardtext.Farm, cardtext.Workshop, cardtext.Town, cardtext.Ironworks, cardtext.Pawn, cardtext.Nobles, cardtext.Gardens, cardtext.Duke, cardtext.Fairgrounds, cardtext.SilkRoad];
    for (let i = 0; i < 10; i++){
        x = Math.floor(Math.random() * supplycards.length)
        prior = createPile(allcards, prior, supplycards[x], piles);
        supplycards.splice(x,1);
    }
}


