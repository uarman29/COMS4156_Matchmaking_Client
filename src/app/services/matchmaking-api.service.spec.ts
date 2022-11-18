import { TestBed } from '@angular/core/testing';

import { MatchmakingApiService } from './matchmaking-api.service';

describe('MatchmakingApiService', () => {
  let service: MatchmakingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchmakingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
