import { TestBed } from '@angular/core/testing';

import { PacketAuctionService } from './packet-auction.service';

describe('PacketAuctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacketAuctionService = TestBed.get(PacketAuctionService);
    expect(service).toBeTruthy();
  });
});
