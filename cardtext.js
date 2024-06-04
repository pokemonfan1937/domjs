
import {coins, buys, actions, potions} from './bonus.js';
import { cards } from './cards.js';
import { gaintodiscard } from './gain.js';
import {chooseBetween, choosefromSupply} from './choice.js'
import { checktype } from './card.js';
export class cardText {

    constructor(name, effect, types, cost, text, count){
        this.name = name;
        this.effect = effect;
        this.types = types;
        this.cost = cost;
        this.text = text;
        this.count = count;
    }
    play(){
        effect;
    }

}

export let Copper = new cardText("Copper", async function(){
    coins(1);
}, ["Treasure"], [0, 0, 0], "+1$", 60);

export let Silver = new cardText("Silver", async function(){
    coins(2);
}, ["Treasure"], [0, 0, 3], "+2$", 40);

export let Gold = new cardText("Gold", async function(){
    coins(3);
}, ["Treasure"], [0, 0, 6], "+3$", 30);

export let Platinum = new cardText("Platinum", async function(){
    coins(5);
}, ["Treasure"], [0, 0, 9], "+5$", 12);

export let Estate = new cardText("Estate", async function(){
}, ["Victory"], [0, 0, 2], "1 VP", 14);

export let Duchy = new cardText("Duchy", async function(){
}, ["Victory"], [0, 0, 5], "3 VP", 8);

export let Province = new cardText("Province", async function(){
}, ["Victory"], [0, 0, 8], "6 VP", 8);

export let Colony = new cardText("Colony", async function(){
}, ["Victory"], [0, 0, 11], "10 VP", 8);

export let Gardens = new cardText("Gardens", async function(){
}, ["Victory"], [0, 0, 4], "Worth 1 VP per 10 cards you have(round down)", 8);

export let Duke = new cardText("Duke", async function(){
}, ["Victory"], [0, 0, 5], "Worth 1 VP per Duchy you have", 8);

export let Fairgrounds = new cardText("Fairgrounds", async function(){
}, ["Victory"], [0, 0, 6], "Worth 2 VP per 5 differently named cards you have(round down)", 8);

export let SilkRoad = new cardText("Silk Road", async function(){
}, ["Victory"], [0, 0, 4], "Worth 1 VP per 4 Victory cards you have(round down)", 8);

export let Curse = new cardText("Curse", async function(){
}, ["Curse"], [0, 0, 0], "-1 VP", 10);

export let Village = new cardText("Village", async function(){
    cards(1);
    actions(2);
}, ["Action"], [0, 0, 3], "+1 Card\n+2 Actions", 10);

export let Port = new cardText("Port", async function(){
    cards(1);
    actions(2);
}, ["Action"], [0, 0, 4], "+1 Card\n+2 Actions", 12);

export let Smithy = new cardText("Smithy", async function(){
    cards(3);
}, ["Action"], [0, 0, 4], "+3 Cards", 10);

export let Laboratory = new cardText("Laboratory", async function(){
    cards(2);
    actions(1);
}, ["Action"], [0, 0, 5], "+2 Cards\n+1 Action", 10);

export let WorkersVillage = new cardText("WorkersVillage", async function(){
    cards(1);
    actions(2);
    buys(1);
}, ["Action"], [0, 0, 4], "+1 Card\n+2 Actions\n+1 Buy", 10);

export let Festival = new cardText("Festival", async function(){
    actions(2);
    buys(1);
    coins(2);
}, ["Action"], [0, 0, 5], "+2 Actions\n+1 Buy\n+2$", 10);

export let Market = new cardText("Market", async function(){
    cards(1);
    actions(1);
    buys(1);
    coins(1);
}, ["Action"], [0, 0, 5], "+1 Card\n+1 Action\n+1 Buy\n+1$", 10);

export let Bazaar = new cardText("Bazaar", async function(){
    cards(1);
    actions(2);
    coins(1);
}, ["Action"], [0, 0, 5], "+1 Card\n+2 Actions\n+1$", 10);

export let Woodcutter = new cardText("Woodcutter", async function(){
    buys(1);
    coins(2);
}, ["Action"], [0, 0, 3], "+1 Buy\n+2$", 10);

export let GreatHall = new cardText("GreatHall", async function(){
    cards(1);
    actions(1);
}, ["Action", "Victory"], [0, 0, 3], "+1 Card\n+1 Action\n1 VP", 8);

export let Farm = new cardText("Farm", async function(){
    coins(2);
}, ["Treasure", "Victory"], [0, 0, 6], "+2$\n2 VP", 8);

export let Workshop = new cardText("Workshop", async function(){
    let card = await choosefromSupply(null, [0, 0, 4]);
    if (card != null){
        gaintodiscard(card);
    }
}, ["Action"], [0, 0, 3], "Gain a card costing up to $4", 10);

export let Ironworks = new cardText("Ironworks", async function(){
    let card = await choosefromSupply(null, [0, 0, 4]);
    if (card != null){
        gaintodiscard(card);
        if (checktype(card, "Action")){
            actions(1);
        }
        if(checktype(card, "Treasure")){
            coins(1);
        }
        if(checktype(card, "Victory")){
            cards(1);
        }
    }

}, ["Action"], [0, 0, 4], "Gain a card costing up to $4\n If it's an\nAction: +1 Action\nTreasure: +1$\nVictory: +1 Card", 10);

export let Town = new cardText("Town", async function(){
    let choices = await chooseBetween(["+1 Card +2 Actions", "+1 Buy +2$"], 1)
    if (choices[0] == 0){
        cards(1);
        actions(2);
    }
    else{
        buys(1);
        coins(2);
    }
}, ["Action"], [0, 0, 4], "Choose one:\n +1 Card +2 Actions; +1 Buy +2$", 10);

export let Pawn = new cardText("Pawn", async function(){
    let choices = await chooseBetween(["+1 Card", "+1 Action", "+1 Buy", "+1$"], 2)
    for (let i = 0; i < 2; i++){
        if (choices[i] == 0){
            cards(1);
        }
        if (choices[i] == 1){
            actions(1);
        }
        if (choices[i] == 2){
            buys(1);
        }
        if (choices[i] == 3){
            coins(1);
        }
    }
}, ["Action"], [0, 0, 2], "Choose two:\n +1 Card; +1 Action; +1 Buy; +1$", 10);

export let Nobles = new cardText("Nobles", async function(){
    let choices = await chooseBetween(["+3 Cards", "+2 Actions"], 1)
    if (choices[0] == 0){
        cards(3);
    }
    else{
        actions(2);
    }
}, ["Action", "Victory"], [0, 0, 6], "Choose one:\n +3 Cards; +2 Actions\n 2 VP", 8);
