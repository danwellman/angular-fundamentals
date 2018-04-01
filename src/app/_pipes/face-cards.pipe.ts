import { Pipe, PipeTransform } from '@angular/core';

import { Card } from '../_models/card';

@Pipe({
  name: 'faceCards'
})
export class FaceCardsPipe implements PipeTransform {

  transform(cards: Card[], easyMode: boolean): Card[] {
    if (!easyMode) {
      return cards;
    }

    return cards.filter(card => card.value < 10);
  }

}
