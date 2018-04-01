import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Deck } from '../_models/deck';
import { FaceCardsPipe } from '../_pipes/face-cards.pipe';
import { PlayerService } from '../_services/player.service';

@Injectable()
export class GameService {
  public acesHigh: boolean;
  public easyMode: boolean;
  public gameStarted: boolean;
  public pipe: FaceCardsPipe;
  public deck: Deck;
  public endMessage: string;

  constructor(
    public playerService: PlayerService,
    private http: HttpClient
  ) {
    this.pipe = new FaceCardsPipe();
  }

  startGame() {
    this.deck = new Deck(this.acesHigh);
    this.deck.cards = this.pipe.transform(this.deck.cards, this.easyMode);
    this.deck.shuffle();
    this.deck.deal(this.playerService.players, 2);
    this.gameStarted = true;
  }

  getNumberFact(): Observable<any> {
    const apiUrl = 'http://numbersapi.com/' + this.playerService.players[1].score;

    return this.http.get(apiUrl, {
      responseType: 'text',
      observe: 'response'
    });
  }

  playerTurn() {
    this.deck.deal([this.playerService.players[1]], 1);
  }

  dealerTurn() {
    this.deck.deal([this.playerService.players[0]], 1);
  }

  resetGame(fullReset?: boolean): void {
    this.gameStarted = false;
    this.endMessage = undefined;

    if (fullReset) {
      this.acesHigh = undefined;
      this.easyMode = undefined;
    }
  }

}
