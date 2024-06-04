import {player, log} from "./index.js";

export var coinp1 = 0;
export var coinp2 = 0;
export var potionp1 = 0;
export var potionp2 = 0;
export var debtp1 = 0;
export var debtp2 = 0;
export var buyp1 = 1;
export var buyp2 = 1;
export var actionp1 = 1;
export var actionp2 = 1;

export function resetvalues(){
    if (player == 1){
        coinp1 = 0;
        potionp1 = 0;
        buyp1 = 1;
        actionp1 = 1;
    }
    else if (player == 2){
        coinp2 = 0;
        potionp2 = 0;
        buyp2 = 1;
        actionp2 = 1;
    }

}

export function coins(i){
    if (player == 1){
        coinp1 += i;
        log("P1 receives +" + i + "$");
    }
    else{
        coinp2 += i;
        log("P2 receives +" + i + "$");
    }
}

export function coinsnolog(i){
    if (player == 1){
        coinp1 += i;
    }
    else{
        coinp2 += i;
    }
}

export function vp(i){
    if (player == 1){
        vpp1 += i;
    }
    else{
        vpp2 += i;
    }
}

export function buys(i){
    if (player == 1){
        buyp1 += i;
        log("P1 receives +" + i + " buys");
    }
    else{
        buyp2 += i;
        log("P2 receives +" + i + " buys");
    }
}

export function buysnolog(i){
    if (player == 1){
        buyp1 += i;
    }
    else{
        buyp2 += i;
    }
}

export function actions(i){
    if (player == 1){
        actionp1 += i;
        log("P1 receives +" + i + " actions");
    }
    else{
        actionp2 += i;
        log("P2 receives +" + i + " actions");
    }
}

export function actionsnolog(i){
    if (player == 1){
        actionp1 += i;
    }
    else{
        actionp2 += i;
    }
}

export function potions(i){
    if (player == 0){
        potionp1 += i;
        log("P1 receives +" + i + " Potions")
    }
    else{
        potionp2 += i;
        log("P2 receives +" + i + " Potions")
    }
}

export function potionsnolog(i){
    if (player == 0){
        potionp1 += i;
    }
    else{
        potionp2 += i;
    }
}

export function retrievecoinp1(){
    return coinp1;
}

export function retrievecoinp2(){
    return coinp2;
}

export function retrievebuyp1(){
    return buyp1;
}

export function retrievebuyp2(){
    return buyp2;
}

export function retrieveactionp1(){
    return actionp1;
}

export function retrieveactionp2(){
    return actionp1;
}
export function retrievepotionp1(){
    return potionp1;
}
export function retrievepotionp2(){
    return potionp2;
}
