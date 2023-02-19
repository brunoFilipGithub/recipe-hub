import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';
import { RecipeHubService } from 'src/app/services/recipe.service';
import { DropdownTypes } from '../dropdown/dropdownType';
import { Choice } from '../dropdown/choice';

@Component({
  selector: 'app-ingredient-input',
  templateUrl: './ingredient-input.component.html',
  styleUrls: ['./ingredient-input.component.scss']
})
export class IngredientInputComponent {

  constructor(private recipeService : RecipeHubService, private cdr : ChangeDetectorRef) { 
  }

  @Input() ingredient !: Ingredient;
  @Output() deleteIngredient : EventEmitter<any> = new EventEmitter();

  dropdownType = DropdownTypes;


  onSelectUnit(ch: Choice) : void {
    this.ingredient.MeasuringUnit = ch.object;
  }

  onDeleteIngredient(id : number) : void {
    this.deleteIngredient.emit(id);
  }

  updateUnitValue(value : number) : void {
    this.ingredient.Quantity = value;
  }
}
