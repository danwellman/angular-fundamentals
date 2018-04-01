import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { By } from '@angular/platform-browser';

import { GameComponent } from './game.component';
import { ControlsComponent } from '../controls/controls.component';
import { ConstantsService } from '../_services/constants.service';
import { PlayerService } from '../_services/player.service';
import { GameService } from '../_services/game.service';

import { ActivatedRouteMock } from '../_mocks/activated-route.mock';
import { ErrorHandler } from '@angular/core/src/error_handler';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        ControlsComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ConstantsService,
        PlayerService,
        GameService,
        { provide: ActivatedRoute, useClass: ActivatedRouteMock }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;

    component.playerService.createPlayer('testDealer');
    component.playerService.createPlayer('testPlayer');

    fixture.detectChanges();
  });

  describe('ngOnInit() method', () => {

    beforeEach(() => {
      spyOn(component.gameService, 'startGame');
    });

    it('stores references to the players', () => {
      component.dealer = undefined;
      component.player = undefined;

      component.ngOnInit();

      expect(component.dealer).toBeDefined();
      expect(component.player).toBeDefined();
    });

    it('calls the startGame method if gameStarted is false', () => {
      component.gameService.gameStarted = false;

      component.ngOnInit();

      expect(component.gameService.startGame).toHaveBeenCalled();
    });

    it('does not call the startGame method if gameStarted is true', () => {
      component.gameService.gameStarted = true;

      component.ngOnInit();

      expect(component.gameService.startGame).not.toHaveBeenCalled();
    });

  });

  describe('ngOnDestroy() method', () => {
    let fakeSubscription;

    beforeEach(() => {
      fakeSubscription = new Subscription(() => null);

      spyOn(fakeSubscription, 'unsubscribe');
    });

    it('calls the unsunscribe method of the subscription if it exists', () => {
      component.factSubscription = fakeSubscription;

      component.ngOnDestroy();

      expect(component.factSubscription.unsubscribe).toHaveBeenCalled();
    });

  });

  describe('template rendering', () => {

    it('displays the sum of the player\'s hand', () => {
      const playerScore = component.playerService.players[1].score;
      const scoreElement = fixture.debugElement.query(By.css('.playerInfo p')).nativeElement;
      const score = parseInt(scoreElement.textContent.split(' ')[1], 10);

      expect(score).toEqual(playerScore);
    });

    it('displays the cards in the player\'s hand', () => {
      const playerHand = component.playerService.players[1].hand;
      const renderedHand = fixture.debugElement.query(By.css('.hand ul')).nativeElement;
      const card1 = renderedHand.firstElementChild.firstElementChild;
      const card2 = renderedHand.lastElementChild.firstElementChild;

      expect(card1.textContent).toEqual(`The ${playerHand[0].name || playerHand[0].value} of ${playerHand[0].suit}`);
      expect(card2.textContent).toEqual(`The ${playerHand[1].name || playerHand[1].value} of ${playerHand[1].suit}`);
    });

  });

  fdescribe('getFact() method', () => {
    let successHandler, errorHandler, alwaysHandler;

    beforeEach(() => {
      spyOn(component.gameService, 'getNumberFact').and.returnValue({
        subscribe: (success, error, always) => {
          successHandler = success;
          errorHandler = error;
          alwaysHandler = always;
        }
      });
    });

    it('invokes the getNumberFact method of the game service', () => {
      component.getFact();

      expect(component.gameService.getNumberFact).toHaveBeenCalled();
    });

    describe('on success', () => {

      it('sets the fact property to the response and showFact to true', () => {
        const fakeResponse = { body: 'test' };
        component.showFact = false;
        component.getFact();

        successHandler(fakeResponse);

        expect(component.fact).toEqual('test');
        expect(component.showFact).toEqual(true);
      });

    });

    describe('on error', () => {

      beforeEach(() => {
        spyOn(console, 'log');
      });

      it('logs the error', () => {
        const fakeError = 'oops';
        component.getFact();

        errorHandler(fakeError);

        expect(console.log).toHaveBeenCalledWith('oops');
      });

    });

    describe('always', () => {

      it('sets the showFact property to false after 5 seconds', fakeAsync(() => {
        component.showFact = true;
        component.getFact();

        alwaysHandler();
        tick(5000);

        expect(component.showFact).toEqual(false);
      }));

    });

  });
});
