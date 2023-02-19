import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, take } from 'rxjs';
import { DialogService } from 'src/app/dialog/dialog.service';
import { ISubmittable } from 'src/app/dialog/ISubmittable';
import { ITabbable } from 'src/app/dialog/ITabbable';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { User } from 'src/app/models/user';
import { ViewRecipeResponse } from 'src/app/models/ViewRecipeResponse';
import { RecipeHubService } from 'src/app/services/recipe.service';
import { Choice } from 'src/app/ui_components/dropdown/choice';
import { DropdownTypes } from 'src/app/ui_components/dropdown/dropdownType';

@Component({
  selector: 'app-upsert-recipe-tab',
  templateUrl: './upsert-recipe-tab.component.html',
  styleUrls: ['./upsert-recipe-tab.component.scss']
})
export class UpsertRecipeTabComponent implements OnInit, AfterViewInit, ITabbable, ISubmittable {

  dropdownTypes = DropdownTypes;
  selectedIngredients : Ingredient[] = new Array();
  displayErrorMessages : Boolean = false;

  public readonly valueEmitter : Subject<any> = new Subject<any>();
  get ValueEmitter() : Observable<any>{
    return this.valueEmitter.asObservable();
  }


  @Input() initialValue ?: ViewRecipeResponse;
  
  constructor(private formBuilder : FormBuilder, private recipeService : RecipeHubService, private dialogService : DialogService, 
              private cdr : ChangeDetectorRef, private jwtHelper: JwtHelperService, private router : Router) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  createRecipeForm = this.formBuilder.group({
    recipeName: '', 
    recipeDescription: ''
  });

  ngOnInit(): void {

    if(this.initialValue){
      this.createRecipeForm.get("recipeName")?.setValue(this.initialValue.Recipe.Name);
      this.createRecipeForm.get("recipeDescription")?.setValue(this.initialValue.Recipe.Description);
      this.selectedIngredients = Object.assign([], this.initialValue.Recipe.Ingredients);
    }
  }
  
  onIngredientSelect(ch : Choice) : void {
    if(this.selectedIngredients.some(ing => ing.Id == ch.object.Id) == false)
    {
      this.selectedIngredients.push(ch.object as Ingredient);
    }

    this.cdr.detectChanges();
  }

  onDeleteIngredient(id : number) : void {
    if(this.selectedIngredients.some(ing => ing.Id == id))
    {
      let index = this.selectedIngredients.findIndex(element => element.Id == id);
      this.selectedIngredients.splice(index, 1);
    }
  }

  allIngredientUnitsAssigned() : boolean {
    for(let i = 0; i < this.selectedIngredients.length; i++)
    {
      if(this.selectedIngredients[i].MeasuringUnit == undefined)
      {
        return false;
      }
    }
    return true;
  }

  onSubmit(): boolean {
    if (this.selectedIngredients.length == 0
      || this.createRecipeForm.get("recipeName")?.value == ""
      || this.createRecipeForm.get("recipeDescription")?.value == "") {

      this.displayErrorMessages = true;
      return false;
    }

    if (this.allIngredientUnitsAssigned() == false) {
      return false;
    }

    this.displayErrorMessages = false;

    let user : User;

    if(this.recipeService.isUserAuthenticated()){
      user = JSON.parse(this.jwtHelper.decodeToken(localStorage.getItem("jwt")!).user);
    }
    else {
      return false;
    }

    let a = this.createRecipeForm.get("recipeName")?.value;

    console.log(a);
    let recipe : Recipe = { 
      Id : 0, 
      UserId : user.Id,
      Name : a,
      Description : this.createRecipeForm.get("recipeDescription")?.value,
      ImageString : "",
      Ingredients : this.selectedIngredients,
      Steps : []
    } ;

    console.log(recipe);

    let viewRecipeResponse : ViewRecipeResponse = {
      User : user,
      Recipe : recipe
    };

    this.valueEmitter.next(viewRecipeResponse);
    return true;
  }
  

}

