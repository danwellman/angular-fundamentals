import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { PlayerService } from './player.service';

@Injectable()
export class PlayerGuardService implements CanActivate {

  constructor(
    public playerService: PlayerService,
    public router: Router
  ) { }

  canActivate() {
    if (this.playerService.players.length < 2) {
      this.router.navigate(['/start']);
      return false;
    }
    return true;
  }

}
