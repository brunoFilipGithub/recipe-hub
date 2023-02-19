import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'src/app/dialog/dialog.service';
import { RecipeStepsTabComponent } from 'src/app/ui_components/dialogs/dialog-tabs/recipe-steps-tab/recipe-steps-tab.component';
import { UploadRecipeImageComponent } from 'src/app/ui_components/dialogs/dialog-tabs/upload-recipe-image/upload-recipe-image.component';
import { UpsertRecipeTabComponent } from 'src/app/ui_components/dialogs/dialog-tabs/upsert-recipe-tab/upsert-recipe-tab.component';
import { Recipe } from 'src/app/models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeHubService } from 'src/app/services/recipe.service';
import { take } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';
import { ViewRecipeResponse } from 'src/app/models/ViewRecipeResponse';

declare var require: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recipeResponses : ViewRecipeResponse[] | null | undefined = new Array();

  constructor(private titleService : Title, private dialogService : DialogService, 
              private changeDetector : ChangeDetectorRef, private router : Router, 
              public recipeHubService : RecipeHubService, private jwtHelper : JwtHelperService) {
    titleService.setTitle("Recipes:");
  }
  
  ngOnInit() {
    this.recipeHubService.GetAllRecipes().pipe(take(1)).subscribe({
      next : (res) => {
      this.recipeResponses = res;
    }, 
    error: (err) => {
      if(err.status == 0){
        const dialogR = this.dialogService.openMessageDialog("Error", "Could not get a response from server!");
        window.location.reload();
      }
      else {
        this.recipeResponses = null;
      }
    }});
  }

  createRecipe(): void {
    let dialog = this.dialogService.openDialogWithTabs("Upsert recipe:", [
      {tabType : UpsertRecipeTabComponent, tabTitle : "Recipe form"},
      {tabType : RecipeStepsTabComponent, tabTitle : "Recipe steps"},
      {tabType : UploadRecipeImageComponent, tabTitle : "Recipe image"}
    ]);
    
    dialog.instance.OnClose.pipe(take(1)).subscribe(res => {
      if(res)
      {
        let recipe : Recipe = res[0].Recipe;
        recipe.Steps = res[1];
        recipe.ImageString = res[2];

        this.onSubmit(recipe);
      }
    })

    /*
    let dialog = this.dialogService.openDialogWithTabs("Upsert recipe:", [
      {tabType : UpsertRecipeTabComponent, tabTitle : "Recipe form", tabResult : recipeToEdit},
      {tabType : RecipeStepsTabComponent, tabTitle : "Recipe steps", tabResult : recipeToEdit.Recipe.Steps},
      {tabType : UploadRecipeImageComponent, tabTitle : "Recipe image", tabResult : recipeToEdit.Recipe.ImageString}
    ]);
    
    dialog.instance.OnClose.pipe(take(1)).subscribe(res => {
      console.log(res);
      debugger;
    })
    */
  }

  onSubmit(recipe : Recipe) {
    recipe.UserId = (this.recipeHubService.LoggedInUser as User).Id;

    if(this.recipeHubService.isUserAuthenticated()){
        this.recipeHubService.PostRecipe(recipe).subscribe({
          next: (result) => 
          {
            this.dialogService.openMessageDialog("Message", "Recipe successfully created!");

            let self = this;
            window.setTimeout(function () {
              self.router.navigate(['/view-recipe-page/' + result.Id]);
          }, 2500);
          },
          error: (err) => {
            this.dialogService.openMessageDialog("Error", "Something went wrong! Server error.");}
          });
        }
  }

}
