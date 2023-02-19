import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStepsTabComponent } from './recipe-steps-tab.component';

describe('RecipeStepsTabComponent', () => {
  let component: RecipeStepsTabComponent;
  let fixture: ComponentFixture<RecipeStepsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeStepsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStepsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
