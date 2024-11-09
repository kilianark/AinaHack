import { TestBed } from '@angular/core/testing';

import { ChatyService } from './chaty.service';

describe('ChatyService', () => {
  let service: ChatyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
