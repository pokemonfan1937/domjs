import { discardp1, discardp2, pileindex, piles, refreshall, player, log } from "./index.js";
import { frompiletohere } from "./pile.js";

export function gaintodiscard(card){
    if (player == 1){
        frompiletohere(piles[pileindex(piles, card.name)], discardp1, card.id);
        log("P1 gains a " + card.name);
        refreshall();
    }
    if (player == 2){
        frompiletohere(piles[pileindex(piles, card.name)], discardp2, card.id);
        log("P2 gains a " + card.name);
        refreshall();
    }
}