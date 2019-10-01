import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { packetAuctionComponent } from './packetauction.component';

describe('packetAuctionComponent', () => {
  let component: packetAuctionComponent;
  let fixture: ComponentFixture<packetAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ packetAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(packetAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
