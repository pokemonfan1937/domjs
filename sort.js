import {card} from './card.js';

export function sortPiles(piles){
    let n = piles.length;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (piles[i].cost()[2] > piles[j].cost()[2]){
                let temp = piles[i];
                piles[i] = piles[j];
                piles[j] = temp;
            }
            else if (piles[i].cost()[2] == piles[j].cost()[2]){
                if (piles[i].cost()[1]  > piles[j].cost()[1] ){
                    let temp = piles[i];
                    piles[i] = piles[j];
                    piles[j] = temp;
                }
                else if (piles[i].cost()[1]  == piles[j].cost()[1] ){
                    if (piles[i].cost()[0]  > piles[j].cost()[0] ){
                        let temp = piles[i];
                        piles[i] = piles[j];
                        piles[j] = temp;
                    }
                }
            }
        }
    }
}

export function sort(cardarea){
    let actionBucket = [];
    let treasureBucket = [];
    let nightBucket = [];
    let victoryBucket = [];
    let curseBucket = [];
    let Bucket = [actionBucket, treasureBucket, nightBucket, victoryBucket, curseBucket]
    while (cardarea.count() != 0){
        if (cardarea.card().checktype("Action")){
            Bucket[0].push(cardarea.cards.shift());
        }
        else if (cardarea.card().checktype("Treasure")){
            Bucket[1].push(cardarea.cards.shift());
        }
        else if (cardarea.card().checktype("Night")){
            Bucket[2].push(cardarea.cards.shift());
        }
        else if (cardarea.card().checktype("Victory")){
            Bucket[3].push(cardarea.cards.shift());
        }  
        else if (cardarea.card().checktype("Curse")){
            Bucket[4].push(cardarea.cards.shift());
        }
    }
    for (let i = 0; i < 5; i++){
        for (let j = 0; j < Bucket[i].length; j++){
            for (let k = 0; k < Bucket[i].length; k++){
                if (Bucket[i][j].name.localeCompare(Bucket[i][k].name) == 1){
                    let temp = Bucket[i][j];
                    Bucket[i][j] = Bucket[i][k];
                    Bucket[i][k] = temp;
                }
            }
        }
    }
    for (let i = 0; i < 5; i++){
        for (let j = 0; j < Bucket[i].length; j++){
            cardarea.cards.push(Bucket[i][j]);
        }
    }
    
    
}