import {refreshall, log, player} from './index.js'

export async function play(card){
    if (player == 1){
        log("P1 plays a " + card.name);
    }
    else{
        log("P2 plays a " + card.name);
    }
    await card.effect();
    refreshall();
}