import { TestBed } from '@angular/core/testing';

import { JWTServiceService } from './jwtservice.service';

describe('JWTServiceService', () => {
  let service: JWTServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
