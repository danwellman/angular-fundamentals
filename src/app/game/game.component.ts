import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Player } from '../_models/player';
import { Deck } from '../_models/deck';
import { PlayerService } from '../_services/player.service';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  public player: Player;
  public dealer: Player;
  public factSubscription: Subscription;
  public fact: string;
  public showFact = false;

  constructor(
    public playerService: PlayerService,
    public gameService: GameService,
    public router: Router
  ) { }

  ngOnInit() {
    this.dealer = this.playerService.players[0];
    this.player = this.playerService.players[1];

    if (!this.gameService.gameStarted) {
      this.gameService.startGame();
    }
  }

  ngOnDestroy(): void {
    if (this.factSubscription) {
      this.factSubscription.unsubscribe();
    }
  }

  doStick() {
    while (this.dealer.score < 17) {
      this.gameService.dealerTurn();
    }

    if (this.dealer.score > 21) {
      this.gameService.endMessage = `The dealer went bust! You won ${this.player.name}!`;
    } else if (this.dealer.score < this.player.score) {
      this.gameService.endMessage = `Congratulations ${this.player.name}, you beat the dealer! Success is its own reward`;
    } else if (this.dealer.score === this.player.score) {
      this.gameService.endMessage = `I'll give you the benefit of the doubt ${this.player.name}, let's say you won that round`;
    } else {
      this.gameService.endMessage = `Bad luck ${this.player.name}, you lose.`;
    }

    this.router.navigate(['/end']);
  }

  doHit() {
    this.gameService.playerTurn();

    if (this.player.score > 21) {
      this.gameService.endMessage = `It's bad new ${this.player.name},  you went bust!`;
      this.router.navigate(['/end']);
    }
  }

  getFact() {
    this.factSubscription = this.gameService.getNumberFact().subscribe(
      response => {
        this.fact = response.body;
        this.showFact = true;
      },
      error => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          this.showFact = false;
        }, 5000);
      }
    );
  }

}
