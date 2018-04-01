import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { EndComponent } from './end/end.component';
import { GameComponent } from './game/game.component';
import { ControlsComponent } from './controls/controls.component';
import { ConstantsService } from './_services/constants.service';
import { FaceCardsPipe } from './_pipes/face-cards.pipe';
import { FeedbackComponent } from './feedback/feedback.component';
import { NameNotDealerDirective } from './_directives/name-not-dealer.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { appRoutes } from './app.routes';
import { PlayerService } from './_services/player.service';
import { HelpComponent } from './help/help.component';
import { GameService } from './_services/game.service';
import { PlayerGuardService } from './_services/player-guard.service';
import { RulesComponent } from './help/rules/rules.component';
import { StrategyComponent } from './help/strategy/strategy.component';
import { RequestedWithHeaderInterceptor } from './_services/requested-with-header.interceptor';

@NgModule({
  declarations: [
    HomeComponent,
    StartComponent,
    EndComponent,
    GameComponent,
    ControlsComponent,
    FaceCardsPipe,
    FeedbackComponent,
    NameNotDealerDirective,
    PageNotFoundComponent,
    HelpComponent,
    RulesComponent,
    StrategyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ConstantsService,
    PlayerService,
    GameService,
    PlayerGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestedWithHeaderInterceptor, multi: true }
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
