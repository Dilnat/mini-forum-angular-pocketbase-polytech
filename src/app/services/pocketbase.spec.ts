import { TestBed } from '@angular/core/testing';

import { Pocketbase } from './pocketbase';

describe('Pocketbase', () => {
  let service: Pocketbase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pocketbase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
