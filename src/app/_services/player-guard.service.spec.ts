import { TestBed, inject } from '@angular/core/testing';

import { PlayerGuardService } from './player-guard.service';

describe('PlayerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerGuardService]
    });
  });

  it('should be created', inject([PlayerGuardService], (service: PlayerGuardService) => {
    expect(service).toBeTruthy();
  }));
});
