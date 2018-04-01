import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../_models/player';
import { PlayerService } from '../_services/player.service';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {
  public dealer: Player;
  public player: Player;

  constructor(
    public playerService: PlayerService,
    public gameService: GameService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.dealer = this.playerService.players[0];
    this.player = this.playerService.players[1];
  }

  doQuit() {
    this.gameService.resetGame(true);
    this.playerService.removePlayer(true);
    this.playerService.resetDealer();

    this.router.navigate(['/start']);
  }

  doAgain() {
    this.gameService.resetGame();
    this.playerService.removePlayer();

    this.playerService.resetDealer();

    this.router.navigate(['/start']);
  }

}
