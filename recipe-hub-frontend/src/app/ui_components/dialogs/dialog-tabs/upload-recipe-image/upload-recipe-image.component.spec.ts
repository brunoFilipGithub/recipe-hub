import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRecipeImageComponent } from './upload-recipe-image.component';

describe('UploadRecipeImageComponent', () => {
  let component: UploadRecipeImageComponent;
  let fixture: ComponentFixture<UploadRecipeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRecipeImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRecipeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
