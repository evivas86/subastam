import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastamazoComponent } from './subastamazo.component';

describe('SubastamazoComponent', () => {
  let component: SubastamazoComponent;
  let fixture: ComponentFixture<SubastamazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubastamazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubastamazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
