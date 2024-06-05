import {cardText} from './cardtext.js';

export class card extends cardText{

    constructor(id, name, effect, types, cost, text, count, faceup){
        super(name, effect, types, cost, text, count)
        this.id = id;
        this.faceup = faceup;
    }
    checktype(type){
        if (this.types.includes(type)){
            return true;
        }
        else{
            return false;
        }
    }
    checkcost(cost){
        if (this.cost[0] <= cost[0] && this.cost[1] <= cost[1] && this.cost[2] <= cost[2]){
            return true;
        }
        else{
            return false;
        }
    }
}

export function createCard(id, cardtext, faceup){
    return new card(id, cardtext.name, cardtext.effect, cardtext.types, cardtext.cost, cardtext.text, cardtext.count, faceup);
}
