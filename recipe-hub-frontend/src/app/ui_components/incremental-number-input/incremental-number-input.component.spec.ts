import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementalNumberInputComponent } from './incremental-number-input.component';

describe('IncrementalNumberInputComponent', () => {
  let component: IncrementalNumberInputComponent;
  let fixture: ComponentFixture<IncrementalNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncrementalNumberInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementalNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
