import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RecipeHubService } from './services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private router:Router, private recipeService : RecipeHubService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.recipeService.isUserAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login-page']);
    return false;
  }
}