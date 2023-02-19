import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, take } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';
import { AuthResponse } from '../models/authResponse';
import { Ingredient } from '../models/ingredient';
import { LoginUser } from '../models/loginUser';
import { Recipe } from '../models/recipe';
import { User } from '../models/user';
import { ViewRecipeResponse } from '../models/ViewRecipeResponse';

@Injectable({
  providedIn: 'root'
})
export class RecipeHubService {
  private serverUrl: string = "https://localhost:7270/api/";

  private authChangeSub = new Subject<boolean>();
  public AuthChanged = this.authChangeSub.asObservable();
  public SendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private dialogService : DialogService, private router : Router) { }

  get LoggedInUser() : User | undefined {
    return JSON.parse(this.jwtHelper.decodeToken(localStorage.getItem("jwt")!).user) as User;
  }

  // ------------- ingredients from JSON file -------------------------
  GetAllIngredients(): Observable<any> {
    return this.httpClient.get("./assets/ingredients.json");
  }

  // -------------- web api calls --------------------------------------
  GetRecipesFromUser(userId: number) {
    console.log(`${this.serverUrl}recipe/userRecipes/${userId}`);
    return this.httpClient.get<Recipe>(`${this.serverUrl}recipe/userRecipes/${userId}`);
  }

  GetAllRecipes(): Observable<ViewRecipeResponse[]> {
    return this.httpClient.get<ViewRecipeResponse[]>(this.serverUrl + "recipe/");
  }

  GetRecipe(id: number): Observable<ViewRecipeResponse> {
    let url = `${this.serverUrl}recipe/${id}`
    return this.httpClient.get<ViewRecipeResponse>(url);
  }

  PostUserRegister(user: User): Observable<User> {
    return this.httpClient.post<User>(this.serverUrl + "user/", user);
  }

  PostRecipe(recipe: Recipe): Observable<Recipe> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    console.log(recipe);

    return this.httpClient.post<Recipe>(this.serverUrl + "recipe/", recipe, options);
  }

  PostUserLogin(loginUser: LoginUser) {
    return this.httpClient.post<AuthResponse>(this.serverUrl + "user/login/", loginUser);
  }

  DeleteRecipe(id : number) {
    return this.httpClient.delete(`${this.serverUrl}recipe/${id}`);
  }

  PutRecipe(recipe : Recipe) {
    return this.httpClient.put(`${this.serverUrl}recipe/putRecipe`, recipe);
  }

  // ----------------- user auth --------------------------------------
  logOut = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if(token != null && token != undefined)
    {
      if(this.jwtHelper.isTokenExpired(token))
      {
        let dialogRef = this.dialogService.openMessageDialog("Error","Your session ended. Please log back in!");

        dialogRef.instance.OnClose.pipe(take(1)).subscribe(result => {
          localStorage.removeItem("jwt");
          this.router.navigate(['/login-page/']);
        });

        return false;
      }

      return true;
    }

    return false;
  }

}
