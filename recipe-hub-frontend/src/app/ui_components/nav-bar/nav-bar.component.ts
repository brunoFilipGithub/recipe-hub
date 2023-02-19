import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeHubService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserAuthenticated !: boolean;
  
  constructor(private recipeService: RecipeHubService, private router: Router) {
    this.recipeService.AuthChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
   }

  ngOnInit(): void {
    this.recipeService.AuthChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  public logOut = () => {
    this.recipeService.logOut();
    this.router.navigate(["/login-page"]);
  }

}
