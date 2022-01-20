import { TestBed, inject } from '@angular/core/testing';

import { KeyboardShortcutsService } from './ng-hotkeys.service';

describe('KeyboardShortcutsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyboardShortcutsService]
    });
  });

  it('should be created', inject([KeyboardShortcutsService], (service: KeyboardShortcutsService) => {
    expect(service).toBeTruthy();
  }));
});
