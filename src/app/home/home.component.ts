import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title = 'js-blackjack';
  public viewFeedbackForm = false;

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.createPlayer('Dealer');
  }

  showFeedback() {
    this.viewFeedbackForm = true;
  }

  hideFeedbackForm() {
    this.viewFeedbackForm = false;
  }
}
