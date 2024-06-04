import {fromheretothere} from './cardarea.js';
import {deckp1, deckp2, discardp1, discardp2, handp1, handp2, log, player} from './index.js';
import {sort} from './sort.js';

export function cards(n){
    let x = 0;
    if (player == 1){
        for (let i = 0; i < n; i++){
            if (deckp1.count() != 0){
                deckp1.cards[0].faceup = 1;
                fromheretothere(deckp1, handp1, deckp1.id(0));
            }
            else if (discardp1.count() != 0){
                let x = discardp1.count()
                for (let j = 0; j < x; j++){
                    fromheretothere(discardp1, deckp1, discardp1.id(0))
                }
                deckp1.shuffle();
                deckp1.cards[0].faceup = 1;
                fromheretothere(deckp1, handp1, deckp1.id(0));
            }
            else{
                break;
            }
            x++;
        }
        sort(handp1);
        log("P1 draws " + x + " cards");
    }
    else if (player == 2){
        for (let i = 0; i < n; i++){
            if (deckp2.count() != 0){
                deckp2.cards[0].faceup = 2;
                fromheretothere(deckp2, handp2, deckp2.id(0));
            }
            else if (discardp2.count() != 0){
                let x = discardp2.count()
                for (let j = 0; j < x; j++){
                    fromheretothere(discardp2, deckp2, discardp2.id(0))
                }
                deckp2.shuffle();
                deckp2.cards[0].faceup = 2;
                fromheretothere(deckp2, handp2, deckp2.id(0));
            }
            else{
                break;
            }
            x++;
        }
        sort(handp2);
        log("P2 draws " + x + " cards");
    }
}