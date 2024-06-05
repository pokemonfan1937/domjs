
import * as cardtext from './cardcollection.js';
import {pile, createPile, frompiletohere} from './pile.js';
import {createKingdom} from './kingdom.js';
import {cardarea, fromheretothere} from './cardarea.js';
import {deck} from './deck.js';
import {cards} from './cards.js';
import {hand} from './hand.js';
import {sortPiles , sort} from './sort.js';
import { discard } from './discardpile.js';
import {resetvalues, retrievecoinp1, actionsnolog, potionsnolog, retrievebuyp1, retrieveactionp1, buysnolog, coinsnolog, retrievecoinp2, retrievebuyp2, retrieveactionp2, retrievepotionp1, retrievepotionp2} from './bonus.js';
import {play} from './play.js';
import { gaintodiscard } from './gain.js';
import { discardfromarea } from './discard.js';

export function refresh(){
    document.getElementById("Player1Hand").innerHTML = handp1.stringform();
    document.getElementById("Player1Deck").innerHTML = deckp1.stringform();
    document.getElementById("Player1Discard").innerHTML = discardp1.stringform();
    document.getElementById("Player2Hand").innerHTML = handp2.stringform();
    document.getElementById("Player2Deck").innerHTML = deckp2.stringform();
    document.getElementById("Player2Discard").innerHTML = discardp2.stringform();
    document.getElementById("Player1PlayArea").innerHTML = playareap1.stringform();
    document.getElementById("Player2PlayArea").innerHTML = playareap2.stringform();
    document.getElementById("Supply").innerHTML = pilesstringform();
    if (player == 1){
        document.getElementById("Coins").innerText = retrievecoinp1();
        document.getElementById("Buys").innerText = retrievebuyp1();
        document.getElementById("Actions").innerText = retrieveactionp1();
    }
    else{
        document.getElementById("Coins").innerText = retrievecoinp2();
        document.getElementById("Buys").innerText = retrievebuyp2();
        document.getElementById("Actions").innerText = retrieveactionp2();
    }
    for (let i = 0; i < allcards.length; i++){
        buttons[i] = document.getElementById(allcards[i].id);
        if (buttons[i] != null){
            buttons[i].onclick = () => {
                buttonhandler(allcards[i]);
            }
        }
    }
}

export function pileindex(piles, name){
    for (let i = 0; i < piles.length; i++){
        if (piles[i].count() != 0){
            if (piles[i].name(0) == name){
                return i;
            }
        }
        else{
            if (piles[i].areaname == name){
                return i;
            }
        }
    }
    return -1;
}

export function hideallbuttons(){
    for (let i = 0; i < allcards.length; i++){
        if (document.getElementById(allcards[i].id) != null){
            document.getElementById(allcards[i].id).hidden = true;
        }
    }
}

export function showbuttonsoftypearea(type, area){
    for (let i = 0; i < area.count(); i++){
        if ((document.getElementById(area.id(i)) != null) && (area.card(i).checktype(type) == true)){
            if (document.getElementById(area.id(i)).textContent != "???"){
                document.getElementById(area.id(i)).removeAttribute("hidden")
            }
        }
        else{
        }
    }
}

export function showsupply(type, cost){
    if (type == null && cost == null){
        for (let i = 0; i < piles.length; i++){
            if (piles[i].count() != 0){
                document.getElementById(piles[i].id()).hidden = false;
            }
        }
    }
    else if (cost == null){
        for (let i = 0; i < piles.length; i++){
            if (piles[i].count() != 0){
                if (piles[i].card().checktype(type)){
                    document.getElementById(piles[i].id()).hidden = false;
                }
            }
        }
    }
    else if (type == null){
        for (let i = 0; i < piles.length; i++){
            if (piles[i].count() != 0){
                if (piles[i].card().checkcost(cost)){
                    document.getElementById(piles[i].id()).hidden = false;
                }
            }
        }
    }
    else{
        for (let i = 0; i < piles.length; i++){
            if (piles[i].count() != 0){
                if (piles[i].card().checktype(type) && piles[i].card().checkcost(cost)){
                    document.getElementById(piles[i].id()).hidden = false;
                }
            }
        }
    }
}

export function log(string){
    document.getElementById("Log").textContent = document.getElementById("Log").textContent + string + "\n"
}

function calculatevp(){
    let temp = deckp1.count()
    for (let i = 0; i < temp; i++){
        fromheretothere(deckp1, handp1, deckp1.id(0))
    }
    temp = discardp1.count()
    for (let i = 0; i < temp; i++){
        fromheretothere(discardp1, handp1, discardp1.id(0))
    }
    temp = deckp2.count()
    for (let i = 0; i < temp; i++){
        fromheretothere(deckp2, handp2, deckp2.id(0))
    }
    temp = discardp2.count()
    for (let i = 0; i < temp; i++){
        fromheretothere(discardp2, handp2, discardp2.id(0))
    }
    temp = handp1.count()
    let victorycount = 0;
    let duchycount = 0;
    let dukecount = 0;
    let fairgroundscount = 0;
    let silkroadcount = 0;
    let names = []
    for (let i = 0; i < temp; i++){
        if (handp1.name(i) == "Province"){
            vpp1 += 6;
            victorycount++;
        }
        else if(handp1.name(i) == "Duchy"){
            vpp1 += 3;
            duchycount++;
            victorycount++;
        }
        else if(handp1.name(i) == "Estate"){
            vpp1 += 1;
            victorycount++;
        }
        else if(handp1.name(i) == "Colony"){
            vpp1 += 10;
            victorycount++;
        }
        else if(handp1.name(i) == "Great Hall"){
            vpp1 += 1;
            victorycount++;
        }
        else if(handp1.name(i) == "Farm"){
            vpp1 += 2;
            victorycount++;
        }
        else if(handp1.name(i) == "Curse"){
            vpp1 += -1;
        }
        else if(handp1.name(i) == "Nobles"){
            vpp1 += 2;
            victorycount++;
        }
        else if (handp1.name(i) == "Gardens"){
            vpp1 += Math.floor(temp / 10);
            victorycount++;
        }
        else if (handp1.name(i) == "Duke"){
            victorycount++;
            dukecount++;
        }
        else if (handp1.name(i) == "Fairgrounds"){
            victorycount++;
            fairgroundscount++;
        }
        else if (handp1.name(i) == "Silk Road"){
            victorycount++;
            silkroadcount++;
        }
        names[i] = handp1.name(i)
    }
    vpp1 += (fairgroundscount * Math.floor(new Set(names).size/5))*2
    vpp1 += duchycount * dukecount;
    vpp1 += silkroadcount * Math.floor(victorycount/4)
    victorycount = 0;
    duchycount = 0;
    dukecount = 0;
    fairgroundscount = 0;
    temp = handp2.count()
    for (let i = 0; i < temp; i++){
        if (handp2.name(i) == "Province"){
            vpp2 += 6;
            victorycount++;
        }
        else if(handp2.name(i) == "Duchy"){
            vpp2 += 3;
            duchycount++;
            victorycount++;
        }
        else if(handp2.name(i) == "Estate"){
            vpp2 += 1;
            victorycount++;
        }
        else if(handp2.name(i) == "Colony"){
            vpp2 += 10;
            victorycount++;
        }
        else if(handp2.name(i) == "Great Hall"){
            vpp2 += 1;
            victorycount++;
        }
        else if(handp2.name(i) == "Farm"){
            vpp2 += 2;
            victorycount++;
        }
        else if(handp2.name(i) == "Curse"){
            vpp2 += -1;
        }
        else if(handp2.name(i) == "Nobles"){
            vpp2 += 2;
            victorycount++;
        }
        else if (handp2.name(i) == "Gardens"){
            vpp2 += Math.floor(temp / 10);
            victorycount++;
        }
        else if (handp2.name(i) == "Duke"){
            victorycount++;
            dukecount++;
        }
        else if (handp2.name(i) == "Fairgrounds"){
            victorycount++;
            fairgroundscount++;
        }
        else if (handp2.name(i) == "Silk Road"){
            victorycount++;
            silkroadcount++;
        }
        names[i] = handp2.name(i)
    }
    vpp2 += (fairgroundscount * Math.floor(new Set(names).size/5))*2
    vpp2 += duchycount * dukecount;
    vpp2 += silkroadcount * Math.floor(victorycount/4)
    victorycount = 0;
    duchycount = 0;
    dukecount = 0;
    fairgroundscount = 0;
}

var priorid = 0;
export var allcards = [];
export var buttons = [];
export var piles = [];
priorid = createPile(allcards, priorid, cardtext.Copper, piles);
priorid = createPile(allcards, priorid, cardtext.Silver, piles);
priorid = createPile(allcards, priorid, cardtext.Gold, piles);
priorid = createPile(allcards, priorid, cardtext.Curse, piles);
priorid = createPile(allcards, priorid, cardtext.Estate, piles);
priorid = createPile(allcards, priorid, cardtext.Duchy, piles);
priorid = createPile(allcards, priorid, cardtext.Province, piles);

priorid = createKingdom(allcards, priorid, piles)
sortPiles(piles);

function pilesstringform(){
    let temp = "";
    for (let i = 0; i < piles.length; i++){
        if (piles[i].count() != 0){
            temp = temp + piles[i].cards[0].name + "<button id=" + piles[i].cards[0].id + " hidden >"  + piles[i].cards[0].name + " " + piles[i].count() + "</button>" + "<br>"; 
        }
        else{
            temp = temp + piles[i].areaname + "<br>"; 
        }
    }
    if (temp == ""){
        return "Nothing\n";
    }
    else{
        return temp;
    }
}

export var deckp1 = new deck([], "Player 1's Deck", 1);
let index = pileindex(piles, "Copper");
let id = 0;
for (let i = 0; i < 7; i++){
    id = piles[index].id(0);
    frompiletohere(piles[index], deckp1, id);
}
index = pileindex(piles, "Estate");
for (let i = 0; i < 3; i++){
    id = piles[index].id(0);
    frompiletohere(piles[index], deckp1, id);
}

export var deckp2 = new deck([], "Player 2's Deck", 2);
index = pileindex(piles, "Copper");
for (let i = 0; i < 7; i++){
    id = piles[index].id(0);
    frompiletohere(piles[index], deckp2, id);
}
index = pileindex(piles, "Estate");
for (let i = 0; i < 3; i++){
    id = piles[index].id(0);
    frompiletohere(piles[index], deckp2, id);
}
deckp1.shuffle();
deckp2.shuffle();
export var handp1 = new hand([], "Player 1's Hand", 1);

export var handp2 = new hand([], "Player 2's Hand", 2);

export var player = 1;

export let vpp1 = 0;

export let vpp2 = 0;

export var playareap1 = new cardarea([], "Player 1's Play Area");

export var playareap2 = new cardarea([], "Player 2's Play Area");

export var trash = new cardarea([], "Trash");

export var discardp1 = new discard([], "Player 1's Discard Pile");

export var discardp2 = new discard([], "Player 2's Discard Pile");

cards(5);
sort(handp1);
player = 2;
cards(5);
sort(handp2);
player = 1;

let interval = null;

onload = () => {
    refreshall();
    resetvalues();
    if (player == 1){
        showbuttonsoftypearea("Action", handp1);
    }
    else{
        showbuttonsoftypearea("Action", handp2);
    }
}

export function refreshall(){
    refresh();
    hideallbuttons();
}

export var NextPhase = document.getElementById("NextPhase")

function cleanup(player){
    if (player == 1){
        let temp = playareap1.count();
        for (let i = 0; i < temp; i++){
            discardfromarea(playareap1, playareap1.cards[0]);
        }
        temp = handp1.count();
        for (let i = 0; i < temp; i++){
            discardfromarea(handp1, handp1.cards[0]);
        }
        cards(5);
        return 2;
    }
    else{
        let temp = playareap2.count();
        for (let i = 0; i < temp; i++){
            discardfromarea(playareap2, playareap2.cards[0]);
        }
        temp = handp2.count();
        for (let i = 0; i < temp; i++){
            discardfromarea(handp2, handp2.cards[0]);
        }
        cards(5);
        return 1;
    }
}

function checkendgamecondition(){
    let j = 0;
    let a = pileindex(piles, "Province");
    let b = pileindex(piles, "Colony");
    for (let i = 0; i < piles.length; i++){
        if (piles[i].count() == 0){
            j++;
        }
    }
    if (j >= 3){
        return true;
    }
    else if (piles[a].count() == 0){
        return true;
    }
    else if (b != -1){
        if (piles[b].count() == 0){
            return true;
        }
    }
    else{
        return false;
    }
}

if (player == 1){
    showbuttonsoftypearea("Action", handp1);
}
else{
    showbuttonsoftypearea("Action", handp2);
}

NextPhase.onclick = () => {
    if (NextPhase.textContent == "Done playing Actions?"){
        NextPhase.textContent = "Done playing Treasures?"
        refresh();
        hideallbuttons();
        if (player == 1){
            showbuttonsoftypearea("Treasure", handp1);
        }
        else{
            showbuttonsoftypearea("Treasure", handp2);
        }
    }
    else if (NextPhase.textContent == "Done playing Treasures?"){
        NextPhase.textContent = "Done buying cards?"
        refresh();
        hideallbuttons();
        if (player == 1){
            showsupply(null, [0, retrievepotionp1(), retrievecoinp1()]);
        }
        else{
            showsupply(null, [0, retrievepotionp2(), retrievecoinp2()]);
        }
    }
    else if (NextPhase.textContent == "Done buying cards?"){
        player = cleanup(player);
        if (checkendgamecondition()){
            NextPhase.textContent = "Game ends"
            calculatevp();
            log("P1 has " + vpp1 + " VP");
            log("P2 has " + vpp2 + " VP");
            if (vpp1 > vpp2){
                log("P1 wins");
            }
            else if (vpp2 > vpp1){
                log("P2 wins");
            }
            else{
                if (player == 1){
                    log("P2 wins");
                }
                else{
                    log("It's a shared victory");
                }
            }
            return 0;
        }   
        NextPhase.textContent = "Done playing Actions?"
        resetvalues();
        refresh();
        hideallbuttons();
        if (player == 1){
            showbuttonsoftypearea("Action", handp1);
        }
        else{
            showbuttonsoftypearea("Action", handp2);
        }
    }
}

export async function buttonhandler(card){
    if (player == 1){
        if (NextPhase.textContent == "Done playing Treasures?"){
            fromheretothere(handp1, playareap1, card.id);
            await play(card)
            showbuttonsoftypearea("Treasure", handp1);
        }
        else if (NextPhase.textContent == "Done playing Actions?"){
            actionsnolog(-1);
            fromheretothere(handp1, playareap1, card.id);
            await play(card)
            if (retrieveactionp1() != 0){
                showbuttonsoftypearea("Action", handp1);
            }
            else{
                NextPhase.textContent = "Done playing Treasures?"
                showbuttonsoftypearea("Treasure", handp1);
            }
        }
        else if (NextPhase.textContent == "Done buying cards?"){
            if (retrievecoinp1() >= card.cost[2] && retrievebuyp1() > 0){
                log("P1 buys " + card.name);
                buysnolog(-1);
                coinsnolog(-card.cost[2]);
                potionsnolog(-card.cost[1]);
                gaintodiscard(card);
                if (retrievebuyp1() != 0){
                    showsupply(null,[0, retrievepotionp1(), retrievecoinp1()]);
                }
                else{
                    player = cleanup(player);
                    if (checkendgamecondition()){
                        NextPhase.textContent = "Game ends"
                        calculatevp();
                        log("P1 has " + vpp1 + " VP");
                        log("P2 has " + vpp2 + " VP");
                        if (vpp1 > vpp2){
                            log("P1 wins");
                        }
                        else if (vpp2 > vpp1){
                            log("P2 wins");
                        }
                        else{
                            if (player == 1){
                                log("P2 wins");
                            }
                            else{
                                log("It's a shared victory");
                            }
                        }
                        return 0;
                    }   
                    NextPhase.textContent = "Done playing Actions?"
                    resetvalues();
                    refresh();
                    hideallbuttons();
                    showbuttonsoftypearea("Action", handp2);
                }
            }
        }
    }
    else{
        if (NextPhase.textContent == "Done playing Treasures?"){
            fromheretothere(handp2, playareap2, card.id);
            await play(card)
            showbuttonsoftypearea("Treasure", handp2);
        }
        else if (NextPhase.textContent == "Done playing Actions?"){
            actionsnolog(-1);
            fromheretothere(handp2, playareap2, card.id);
            await play(card)
            if (retrieveactionp2() != 0){
                showbuttonsoftypearea("Action", handp2);
                NextPhase.textContent = "Done playing Actions?"
            }
            else{
                showbuttonsoftypearea("Treasure", handp2);
                NextPhase.textContent = "Done playing Treasures?"
            }
        }
        else if (NextPhase.textContent == "Done buying cards?"){
            if (retrievecoinp2() >= card.cost[2] && retrievebuyp2() > 0){
                log("P2 buys " + card.name);
                buysnolog(-1);
                coinsnolog(-card.cost[2]);
                potionsnolog(-card.cost[1]);
                gaintodiscard(card);
                if (retrievebuyp1() != 0){
                    showsupply(null,[0, retrievepotionp2(), retrievecoinp2()]);
                }
                else{
                    player = cleanup(player);
                    if (checkendgamecondition()){
                        NextPhase.textContent = "Game ends"
                        calculatevp();
                        log("P1 has " + vpp1 + " VP");
                        log("P2 has " + vpp2 + " VP");
                        if (vpp1 > vpp2){
                            log("P1 wins");
                        }
                        else if (vpp2 > vpp1){
                            log("P2 wins");
                        }
                        else{
                            if (player == 1){
                                log("P2 wins");
                            }
                            else{
                                log("It's a shared victory");
                            }
                        }
                        return 0;
                    }   
                    NextPhase.textContent = "Done playing Actions?"
                    resetvalues();
                    refresh();
                    hideallbuttons();
                    showbuttonsoftypearea("Action", handp1);
                }
            }
        }
        else{
            choice(card)
        }
    }
}








