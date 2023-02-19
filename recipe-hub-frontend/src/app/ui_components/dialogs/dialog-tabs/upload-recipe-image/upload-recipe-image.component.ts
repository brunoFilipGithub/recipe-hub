import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ISubmittable } from 'src/app/dialog/ISubmittable';
import { ITabbable } from 'src/app/dialog/ITabbable';
import { ViewRecipeResponse } from 'src/app/models/ViewRecipeResponse';

@Component({
  selector: 'app-upload-recipe-image',
  templateUrl: './upload-recipe-image.component.html',
  styleUrls: ['./upload-recipe-image.component.scss']
})
export class UploadRecipeImageComponent implements OnInit, ITabbable, ISubmittable {

  constructor() { }

  private readonly valueEmitter : Subject<any> = new Subject<any>();
  get ValueEmitter(): Observable<any> {
    return this.valueEmitter.asObservable();
  }

  @Input() initialValue ?: string;
  value !: string;

  ngOnInit(): void {
    if(this.initialValue)
      this.value = this.initialValue;
  }

  
  setBase64Value(_value : any) {
    this.value = _value;
  }
  
  onSubmit() : boolean {
    if(this.value == undefined)
    {
      this.value = "/assets/images/default.png";
    }

    this.valueEmitter.next(this.value);
    return true;
  }

}
