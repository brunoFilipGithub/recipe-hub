import { TestBed } from '@angular/core/testing';

import { RecipeHubService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
