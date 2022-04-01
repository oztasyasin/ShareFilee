import { TestBed } from '@angular/core/testing';

import { LinkserviceService } from './linkservice.service';

describe('LinkserviceService', () => {
  let service: LinkserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
