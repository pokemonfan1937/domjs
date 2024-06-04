import { fromheretothere } from "./cardarea.js";
import { log, player, discardp1, discardp2 } from "./index.js";

export function discardfromarea(cardarea, card){
    if (player == 1){
        fromheretothere(cardarea, discardp1, card.id);
        log("P1 discards a " + card.name + " from " + cardarea.areaname)
    }
    else{
        fromheretothere(cardarea, discardp2, card.id);
        log("P2 discards a " + card.name + " from " + cardarea.areaname)
    }
}