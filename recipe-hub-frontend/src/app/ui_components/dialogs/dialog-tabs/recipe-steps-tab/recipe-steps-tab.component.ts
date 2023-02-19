import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ISubmittable } from 'src/app/dialog/ISubmittable';
import { ITabbable } from 'src/app/dialog/ITabbable';
import { Step } from 'src/app/models/step';
import { ViewRecipeResponse } from 'src/app/models/ViewRecipeResponse';

@Component({
  selector: 'app-recipe-steps-tab',
  templateUrl: './recipe-steps-tab.component.html',
  styleUrls: ['./recipe-steps-tab.component.scss']
})
export class RecipeStepsTabComponent implements OnInit, ITabbable, ISubmittable {

  steps : Step[] = new Array(); 
  currentStep !: Step;
  displayTextareaMessage : boolean = false;
  displaySubmitMessage : boolean = false;

  private readonly valueEmitter : Subject<any> = new Subject<any>();

  get ValueEmitter(): Observable<any> {
    return this.valueEmitter.asObservable();
  }
  
  @Input() initialValue ?: Step[];
  
  constructor(private formBuilder : FormBuilder, private el: ElementRef) { }
  
  stepForm = this.formBuilder.group({
    textareaText: '',
  });

  ngOnInit(): void {
    this.steps.push({
      Id: 0,
      RecipeId: 0,
      Index: 0,
      Text: ''
    });

    if(this.initialValue)
    {
      if(this.initialValue.length > 0)
        this.steps = Object.assign([], this.initialValue);
    }

    this.onSelectStep(0); 
  }

  stepsValid() : Boolean {
    if(this.steps.length < 2)
    {
      return false;
    } 
    else if(this.steps.length == 2 && this.currentStep.Text.length < 10) {
      return false;
    }
    else return true;
  }

  stepTextareaValid() : Boolean {

    if(this.stepForm.get("textareaText")?.value.length < 10)
    {
      return false;
    } else return true;
  }

  onTextareaChange(e : any) {
    this.currentStep.Text = this.stepForm.get("textareaText")?.value;
  }

  onFocusTextarea() {
      this.el.nativeElement.querySelector('[formcontrolname="' + "textareaText" + '"]').style.backgroundColor = "rgb(131, 236, 255)";
  }

  outOffFocusTextarea() {
    this.el.nativeElement.querySelector('[formcontrolname="' + "textareaText" + '"]').style.backgroundColor = "white";
  }

  onDeleteStep(event: MouseEvent, index : number) : void {
    event.stopPropagation();
    this.el.nativeElement.querySelector('[formcontrolname="' + "textareaText" + '"]').focus();

    if(index == this.steps[this.steps.length -1].Index)
    {
      this.currentStep = this.steps[index - 1];
    } else if (this.currentStep.Index == index) {
      this.currentStep = this.steps[index + 1];
    }

    this.stepForm.get("textareaText")?.setValue(this.currentStep.Text);

    this.steps.splice(index, 1);

    for(let i = 0; i < this.steps.length; i++)
    {
      this.steps[i].Index = i;
    }

    console.log(this.currentStep);
  }

  onEditStep(index : number) : void {
    this.currentStep.Text = this.stepForm.get("textareaText")?.value;
    this.onSelectStep(this.steps[this.steps.length-1].Index);
    this.el.nativeElement.querySelector('[formcontrolname="' + "textareaText" + '"]').focus();
  }

  onSelectStep(index : number) : void {
    this.currentStep = this.steps[index];
    this.stepForm.get("textareaText")?.setValue(this.currentStep.Text);
  }

  onAddStep() : void {
    this.el.nativeElement.querySelector('[formcontrolname="' + "textareaText" + '"]').focus();

    if(this.stepTextareaValid() == false)
    {
      this.displayTextareaMessage = true;
      return;
    } else this.displayTextareaMessage = false;


    this.steps[this.steps.length - 1] = { Id : 0, RecipeId : 0, Index : this.steps.length-1, Text : this.stepForm.get("textareaText")?.value };
    this.steps.push({
      Id: 0,
      RecipeId: 0,
      Index: this.steps.length,
      Text: ''
    } );
    
    this.currentStep = this.steps[this.steps.length - 1];
    this.stepForm.get("textareaText")?.setValue("");
  }

  onSubmit() : boolean {
    this.el.nativeElement.querySelector('[formcontrolname="' + "textareaText" + '"]').focus();
    
    if(this.stepTextareaValid() == false)
    {
      this.displayTextareaMessage = true;
      return false;
    } 
    if(this.stepsValid() == false)
    {
      this.displaySubmitMessage = true;
      return false;
    } 

    this.displaySubmitMessage = false;
    this.displayTextareaMessage = false;
    
    this.valueEmitter.next(this.steps);
    return true;
  }

}
