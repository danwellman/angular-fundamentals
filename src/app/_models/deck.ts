import { Card } from './card';
import { Player } from './player';
import { ConstantsService } from '../_services/constants.service';

const noop = () => undefined;

export class Deck {
  public cards: Card[] = [];

  constructor(public acesHigh: boolean) {
    const CONSTS = new ConstantsService();

    CONSTS.SUITS.forEach((suit, suitIndex) => {
      this.acesHigh ? CONSTS.PIPS.splice(0, 1, 11) : noop();

      let faceCount = 0;

      CONSTS.PIPS.forEach(value => {
        let name;

        (value === 1 || value === 11) ? name = CONSTS.FACES[0] : noop();

        if (value === 10) {
          if (faceCount === 0) {
            faceCount++;
          } else if (faceCount === 1) {
            name = CONSTS.FACES[1];
            faceCount++;
          } else if (faceCount === 2) {
            name = CONSTS.FACES[2];
            faceCount++;
          } else if (faceCount === 3) {
            name = CONSTS.FACES[3];
            faceCount = 0;
          }
        }

        const color = (suitIndex === 0 || suitIndex === 3) ? CONSTS.COLORS[0] : CONSTS.COLORS[1];
        this.cards.push(new Card(color, suit, name, value));
      });
    });
  }

  shuffle() {
    const tmp = this.cards.slice();
    for (let x = tmp.length; x; x--) {
      const y = Math.floor(Math.random() * x);
      [tmp[x - 1], tmp[y]] = [tmp[y], tmp[x - 1]];
    }
    this.cards = tmp;
  }

  deal(players: Player[], numberOfCards: number) {
    let count = 0;

    while (count < numberOfCards) {
      count++;

      players.forEach(player => {
        const newCard = this.cards.pop();
        player.hand.push(newCard);
        player.score += newCard.value;
      });
    }
  }
}
