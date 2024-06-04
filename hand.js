import {cardarea, fromheretothere} from './cardarea.js';
import {player} from './index.js';
export class hand extends cardarea{
    constructor(cards, areaname, player){
        for (let i = 0; i < cards.length; i++){
            cards[i].faceup = player;
        }
        super()
        this.cards = cards;
        this.areaname = areaname;
        this.player = player;
    }
    stringform(){
        let temp = "";
        for (let i = 0; i < this.cards.length; i++){
            if (player == this.player){
                temp = temp + this.cards[i].name + "<button hidden id=" + this.cards[i].id + ">"  + this.cards[i].name + "</button>" + "<br>";
            }
            else{
                temp = temp + "???" + "<button hidden id=" + this.cards[i].id + ">"  + "???" + "</button>" + "<br>"; 
            }
        }
        if (temp == ""){
            return "Nothing<br>";
        }
        else{
            return temp;
        }
    }
}