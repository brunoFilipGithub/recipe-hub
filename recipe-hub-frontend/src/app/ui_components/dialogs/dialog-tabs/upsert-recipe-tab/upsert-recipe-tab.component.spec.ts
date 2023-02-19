import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertRecipeTabComponent } from './upsert-recipe-tab.component';

describe('UpsertRecipeTabComponent', () => {
  let component: UpsertRecipeTabComponent;
  let fixture: ComponentFixture<UpsertRecipeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertRecipeTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertRecipeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
