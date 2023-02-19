import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser'; 
import { NavigationStart, Router } from '@angular/router';
import { Ingredient } from './models/ingredient';
import { RecipeHubService } from './services/recipe.service';
import { IngredientTagComponent } from './ui_components/ingredient-tag/ingredient-tag.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  

  constructor(private changeDetectorRef : ChangeDetectorRef, public titleService : Title, private router : Router, private recipeService : RecipeHubService) {
    this.refreshOnBroswerButtonPress();
  }

  ngOnInit(): void {
    if(this.recipeService.isUserAuthenticated())
      this.recipeService.SendAuthStateChangeNotification(true);
  }
  

  refreshOnBroswerButtonPress(): void {
    this.router.events.subscribe(event =>  {
      if ((event as NavigationStart).navigationTrigger === 'popstate') {
        window.location.reload();
      }
    });
  }


  
  logOut = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  }

}
