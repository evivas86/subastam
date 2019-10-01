import { TestBed } from '@angular/core/testing';

import { PacketdetailService } from './packetdetail.service';

describe('PacketdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacketdetailService = TestBed.get(PacketdetailService);
    expect(service).toBeTruthy();
  });
});
