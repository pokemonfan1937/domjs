import { cardarea } from "./cardarea.js";

export class discard extends cardarea{
    constructor(cards, areaname, player){
        super(cards, areaname);
        this.player = player;
    }
    stringform(){
        let temp = "";
        for (let i = 0; i < this.cards.length; i++){
            if (i == 0){
                temp = temp + this.cards[i].name + "<button hidden id=" + this.cards[i].id + ">"  + this.cards[i].name + "</button>" + "<br>";
            }
            else{
                temp = temp + "???" + "<button hidden id=" + this.cards[i].id + ">"  + "???" + "</button>" + "<br>";
            }
        }
        if (temp == ""){
            return "Nothing\n";
        }
        else{
            return temp;
        }
    }
}