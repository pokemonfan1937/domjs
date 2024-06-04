import {cardarea, fromheretothere} from './cardarea.js';

export class deck extends cardarea{
    constructor(cards, areaname, player){
        super(areaname);
        for (let i = 0; i < cards.length; i++){
            cards[i].faceup = 0;
        }
        this.cards = cards;
        this.player = player;
    }
    stringform(){
        let temp = "";
        for (let i = 0; i < this.cards.length; i++){
            temp = temp + "???" + "<button id=" + this.cards[i].id + " hidden >"  + "???" + "</button>" + "<br>"; 
        }
        if (temp == ""){
            return "Nothing\n";
        }
        else{
            return temp;
        }
    }
    shuffle(){
        for (let i = 0; i < this.count(); i++){
            this.cards[i].faceup = 0;
        }
        for (let i = this.count() - 1; i > 0; i--){
            let j = Math.floor(Math.random()*(i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this;
    }
}