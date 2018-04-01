import { Routes } from '@angular/router';

import { StartComponent } from './start/start.component';
import { GameComponent } from './game/game.component';
import { EndComponent } from './end/end.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HelpComponent } from './help/help.component';
import { RulesComponent } from './help/rules/rules.component';
import { StrategyComponent } from './help/strategy/strategy.component';
import { PlayerGuardService } from './_services/player-guard.service';

export const appRoutes: Routes = [
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [PlayerGuardService]
  },
  {
    path: 'end',
    component: EndComponent
  },
  {
    path: 'help',
    component: HelpComponent,
    children: [
      {
        path: 'rules',
        component: RulesComponent
      },
      {
        path: 'strategy',
        component: StrategyComponent
      },
      {
        path: '',
        redirectTo: 'rules',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
