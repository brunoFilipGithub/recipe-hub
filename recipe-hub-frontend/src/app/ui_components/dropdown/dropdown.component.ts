import { TypeofExpr } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';
import { RecipeHubService } from 'src/app/services/recipe.service';
import { MUnits } from '../incremental-number-input/measuring-units';
import { DropdownTypes } from './dropdownType';
import { Choice } from './choice';
import * as $ from 'jquery'
import { IngredientInputComponent } from '../ingredient-input/ingredient-input.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements AfterViewInit {

  @Input() type : DropdownTypes | undefined; 
  
  choiceList : Array<any> = new Array<any>();
  dropdownName : String = new String();
  hideDropdown : boolean = false;

  @Output() selectedValue : EventEmitter<any> = new EventEmitter<any>();

  constructor(private recipeService : RecipeHubService) {
    console.log("okay")
   }
  ngAfterViewInit(): void {
    switch(this.type)
    {
      case DropdownTypes.INGREDIENTS: {
        this.dropdownName = "Ingredients";

        this.recipeService.GetAllIngredients().pipe(take(1)).subscribe({
          next: result => { 
            result.forEach((element: any) => {
              this.choiceList.push(element.Name);
          })},

          error: error => console.log("Error while fetching ingredients!" + error)});

        break;
      }

      case DropdownTypes.UNITS: {
        this.dropdownName = "Unit";

        MUnits.forEach((element)  => {
          this.choiceList.push(element);
        });

        break;
      }
    }
  }


  onSelectChoice(choice : string){
    this.hideDropdown = true;

    switch(this.type)
    {
      case DropdownTypes.INGREDIENTS: {
        let ingredient : Ingredient;

        this.recipeService.GetAllIngredients().subscribe({
          next: result => { 
            ingredient = result.filter((ing: Ingredient) => ing.Name == choice)[0];

            let ch : Choice = { type : DropdownTypes.INGREDIENTS, object : ingredient};
            this.selectedValue.emit(ch);
          },

          error: error => console.log("Error while fetching ingredients!" + error)});
        break;
      }

      case DropdownTypes.UNITS: {
        let ch : Choice = { type : DropdownTypes.UNITS, object : choice};
        this.selectedValue.emit(ch);
        break;
      }
    }

    let self = this;

    setInterval(function() {self.hideDropdown = false}, 100);
  }

}
