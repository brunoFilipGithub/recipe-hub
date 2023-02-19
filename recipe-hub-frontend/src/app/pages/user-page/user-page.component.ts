import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { take } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { User } from 'src/app/models/user';
import { ViewRecipeResponse } from 'src/app/models/ViewRecipeResponse';
import { RecipeHubService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  recipeResponses !: ViewRecipeResponse[] | null | undefined;
  user !: User;

  constructor(title : Title, private recipeHubService : RecipeHubService, private jwtHelper : JwtHelperService, router : Router) {
    
    if(recipeHubService.isUserAuthenticated()){
      this.user = JSON.parse(this.jwtHelper.decodeToken(localStorage.getItem("jwt")!).user);
    } else  {
      router.navigate(["/login-page"]);
    }
    
    title.setTitle("Hello, " + this.user.UserName);
   }

  ngOnInit(): void {
    this.recipeHubService.GetRecipesFromUser(this.user.Id).pipe(take(1)).subscribe({ next : (x : any) => {
      this.recipeResponses = x;
    }, error: (err : any) =>  {
      this.recipeResponses = null;
      console.log("Error: " + err);
    }})
  }

}
