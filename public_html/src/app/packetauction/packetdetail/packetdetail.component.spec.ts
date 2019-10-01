import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketdetailComponent } from './packetdetail.component';

describe('PacketdetailComponent', () => {
  let component: PacketdetailComponent;
  let fixture: ComponentFixture<PacketdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
