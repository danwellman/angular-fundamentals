import { FaceCardsPipe } from './face-cards.pipe';
import { Deck } from '../_models/deck';

describe('FaceCardsPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new FaceCardsPipe();
  });

  it('returns the cards if easyMode is false', () => {
    const cards = new Deck(false).cards;

    const result = pipe.transform(cards, false);

    expect(result.length).toEqual(52);
  });

  it('returns the filtered cards if easyMode is true', () => {
    const cards = new Deck(false).cards;

    const result = pipe.transform(cards, true);

    expect(result.length).toEqual(36);
  });

});
