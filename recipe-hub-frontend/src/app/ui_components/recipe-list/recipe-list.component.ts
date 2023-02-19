import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DialogService } from 'src/app/dialog/dialog.service';
import { Recipe } from 'src/app/models/recipe';
import { User } from 'src/app/models/user';
import { ViewRecipeResponse } from 'src/app/models/ViewRecipeResponse';
import { RecipeHubService } from 'src/app/services/recipe.service';
import { RecipeStepsTabComponent } from '../dialogs/dialog-tabs/recipe-steps-tab/recipe-steps-tab.component';
import { UploadRecipeImageComponent } from '../dialogs/dialog-tabs/upload-recipe-image/upload-recipe-image.component';
import { UpsertRecipeTabComponent } from '../dialogs/dialog-tabs/upsert-recipe-tab/upsert-recipe-tab.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnChanges {
  
  @Input() recipeResponses : ViewRecipeResponse[] | undefined | null = new Array();
  showSpinner : boolean = true;
  cc : number = 0;
  
  constructor(public recipeHubService : RecipeHubService, private dialogService : DialogService, private router : Router) { 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.cc == 1) //recipes loaded on 2nd ngOnChanges call
      this.showSpinner = false;

    this.cc++; 
  }

  redirectToRecipe(evt : MouseEvent, id : number) {
    console.log((evt.target as HTMLElement).getAttribute("class") );
    if((evt.target as HTMLElement).getAttribute("class") != "fas fa-edit" &&
       (evt.target as HTMLElement).getAttribute("class")  != "fa-solid fa-trash")
       {
          this.router.navigate([`/view-recipe-page/${id}`]);
       }
  }

  onDeleteRecipe(id : number) : void {
    this.recipeHubService.DeleteRecipe(id).subscribe({
      next : (res: any) => {
        let ref = this.dialogService.openMessageDialog("Message", "Recipe sucessfully deleted!");
        ref.instance.OnClose.pipe(take(1)).subscribe( (res: any) => {
          window.location.reload();
        });
      }
    });
  }

  onEditRecipe(id : number) : void {
    this.recipeHubService.GetRecipe(id).subscribe({
      next : (res:any) => {
        this.editRecipe(res);
      },
      error: (err : any) => {
        let dialog = this.dialogService.openMessageDialog("Error", "Error while fetching the recipe!");

        dialog.instance.OnClose.pipe(take(1)).subscribe(
          res => {
            window.location.reload();
        });
      }
    })
  }

  private editRecipe(recipeToEdit : ViewRecipeResponse) : void {
    let dialog = this.dialogService.openDialogWithTabs("Edit recipe:", [
      {tabType : UpsertRecipeTabComponent, tabTitle : "Recipe form", tabResult : recipeToEdit},
      {tabType : RecipeStepsTabComponent, tabTitle : "Recipe steps", tabResult : recipeToEdit.Recipe.Steps},
      {tabType : UploadRecipeImageComponent, tabTitle : "Recipe image", tabResult : recipeToEdit.Recipe.ImageString}
    ]);
    
    dialog.instance.OnClose.pipe(take(1)).subscribe(res => {
      if(res)
      {
        let recipe : Recipe = res[0].Recipe;
        recipe.Steps = res[1];
        recipe.ImageString = res[2];

        recipe.UserId = (this.recipeHubService.LoggedInUser as User).Id;
        recipe.Id = recipeToEdit.Recipe.Id;
        
        if(this.recipeHubService.isUserAuthenticated())
            this.recipeHubService.PutRecipe(recipe).pipe(take(1)).subscribe({
              next: (result) => 
              {
                this.dialogService.openMessageDialog("Message", "Recipe successfully edited!");

                let self = this;
                window.setTimeout(function () {
                  self.router.navigate(['/view-recipe-page/' + (result as Recipe).Id]);
              }, 2000);
              },
              error: (err) => {
                this.dialogService.openMessageDialog("Error", "Something went wrong! Server error.");

                let self = this;
                window.setTimeout(function () {
                  window.location.reload();
              }, 2000);
              }});
        }
      });
    }
}

