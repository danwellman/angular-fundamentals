import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GameService } from './game.service';
import { PlayerService } from './player.service';
import { Deck } from '../_models/deck';

describe('GameService', () => {
  let gameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameService,
        PlayerService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(inject([GameService], (service: GameService) => {
    gameService = service;
  }));

  describe('startGame() method', () => {

    beforeEach(() => {
      spyOn(gameService.pipe, 'transform').and.callThrough();
    });

    it('creates a new deck', () => {
      delete gameService.deck;

      gameService.startGame();

      expect(gameService.deck).toBeDefined();
    });

    it('transforms the deck using the faceCardsPipe', () => {
      gameService.easyMode = true;

      gameService.startGame();

      expect(gameService.pipe.transform).toHaveBeenCalledWith(
        jasmine.any(Array),
        true
      );
    });

    it('shuffles the deck', () => {
      const freshDeck = new Deck(false);

      gameService.startGame();

      expect(JSON.stringify(gameService.deck.cards)).not.toEqual(
        JSON.stringify(freshDeck.cards)
      );
    });

    it('deals two cards to each player', () => {
      gameService.playerService.createPlayer('testDealer');
      gameService.playerService.createPlayer('testPlayer');

      gameService.startGame();

      expect(gameService.playerService.players[0].hand.length).toEqual(2);
      expect(gameService.playerService.players[1].hand.length).toEqual(2);
    });

    it('sets the gameStarted property to true', () => {
      gameService.gameStarted = false;

      gameService.startGame();

      expect(gameService.gameStarted).toEqual(true);
    });

  });
});
