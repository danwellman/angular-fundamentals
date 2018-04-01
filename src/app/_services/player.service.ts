import { Injectable } from '@angular/core';

import { Player } from '../_models/player';

@Injectable()
export class PlayerService {
  public players: Player[] = [];

  private _cache = [];

  constructor() { }

  get cache() {
    return this._cache.pop();
  }

  set cache(state) {
    this._cache.push(state);
  }

  createPlayer(playerName: string): void {
    this.players.push(new Player(playerName));
  }

  removePlayer(clearCache?: boolean): void {
    this.players.pop();

    if (clearCache) {
      this._cache.pop();
    }
  }

  resetDealer(): void {
    this.players[0].hand = [];
    this.players[0].score = 0;
  }

}
