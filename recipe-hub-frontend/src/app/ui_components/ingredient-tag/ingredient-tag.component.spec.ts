import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientTagComponent } from './ingredient-tag.component';

describe('IngredientTagComponent', () => {
  let component: IngredientTagComponent;
  let fixture: ComponentFixture<IngredientTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
