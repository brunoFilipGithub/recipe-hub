import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-ingredient-tag',
  templateUrl: './ingredient-tag.component.html',
  styleUrls: ['./ingredient-tag.component.scss']
})
export class IngredientTagComponent {

  @Input() ingredient : Ingredient = { Id:0, RecipeId: 0, ClassName:"",Name:"",MeasuringUnit:"", Quantity:0};
  @Output() deleteEvent : EventEmitter<any> = new EventEmitter();

  constructor() { }


  onDelete(id : number | undefined) : void {
    this.deleteEvent.emit(id);
  }
}
