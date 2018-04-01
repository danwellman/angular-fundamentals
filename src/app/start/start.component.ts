import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { ConstantsService } from '../_services/constants.service';
import { PlayerService } from '../_services/player.service';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {
  public acesHigh: boolean;
  public easyMode: boolean;
  public playerName: string;

  private subscription: Subscription;

  constructor(
    public CONSTANTS: ConstantsService,
    public playerService: PlayerService,
    public gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
      if (this.playerName || this.acesHigh || this.easyMode) {
        this.playerService.cache = {
          playerName: this.playerName,
          acesHigh: this.acesHigh,
          easyMode: this.easyMode
        };
      }
    });

    const state = this.playerService.cache;
    if (state) {
      this.playerName = state.playerName;
      this.acesHigh = state.acesHigh;
      this.easyMode = state.easyMode;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startGame(playerForm: FormGroup): void {
    if (playerForm.valid) {
      this.playerService.createPlayer(this.playerName);
      this.gameService.acesHigh = this.acesHigh;
      this.gameService.easyMode = this.easyMode;

      this.router.navigate(['/game']);
    } else {
      playerForm.controls.name.markAsTouched();
    }
  }

  toggleAces(): void {
    this.acesHigh = !this.acesHigh;
  }

  toggleMode(): void {
    this.easyMode = !this.easyMode;
  }

  setPlayerName(name: string): void {
    this.playerName = name;
  }

}
