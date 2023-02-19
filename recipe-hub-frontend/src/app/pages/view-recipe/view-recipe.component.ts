import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { ViewRecipeResponse } from 'src/app/models/ViewRecipeResponse';
import { RecipeHubService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit{

  recipeResponse !: ViewRecipeResponse;

  constructor(private recipeHubService : RecipeHubService, private route : ActivatedRoute, title : Title) {
    
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      this.recipeHubService.GetRecipe(params['id']).pipe(take(1)).subscribe(
      (x : ViewRecipeResponse) =>  { 
          this.recipeResponse = x as ViewRecipeResponse;
          console.log(this.recipeResponse)
          title.setTitle(this.recipeResponse.Recipe.Name); 
       }
    );
   });
  }

  ngOnInit(): void {
  }

}
