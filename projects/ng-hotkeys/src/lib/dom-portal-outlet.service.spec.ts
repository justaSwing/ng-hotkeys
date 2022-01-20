import { TestBed } from '@angular/core/testing';

import { DomPortalOutlet } from './dom-portal-outlet';

describe('DomPortalOutletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomPortalOutlet = TestBed.inject(DomPortalOutlet);
    expect(service).toBeTruthy();
  });
});
