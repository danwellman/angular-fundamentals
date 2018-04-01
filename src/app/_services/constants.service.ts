import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  public COLORS: string[];
  public SUITS: string[];
  public FACES: string[];
  public PIPS: number[];
  public PLAYER_TITLE: string;
  public PLAYER_NAME_LABEL: string;
  public ACES_HIGH_LABEL: string;
  public START_LABEL: string;
  public EASY_MODE_LABEL: string;

  constructor() {
    this.COLORS = ['Black', 'Red'];
    this.SUITS = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    this.FACES = ['Ace', 'Jack', 'Queen', 'King'];
    this.PIPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    this.PLAYER_TITLE = 'Play 21 or bust! Beat the dealer to win big';
    this.PLAYER_NAME_LABEL = 'Player name';
    this.ACES_HIGH_LABEL = 'Aces high?';
    this.START_LABEL = 'Start!';
    this.EASY_MODE_LABEL = 'Easy mode?';
  }

}
