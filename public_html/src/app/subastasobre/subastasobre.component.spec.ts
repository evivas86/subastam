import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastasobreComponent } from './subastasobre.component';

describe('SubastasobreComponent', () => {
  let component: SubastasobreComponent;
  let fixture: ComponentFixture<SubastasobreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubastasobreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubastasobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
