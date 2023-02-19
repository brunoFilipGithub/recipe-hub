import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  
  @Output()  base64 : EventEmitter<string> = new EventEmitter();
  @Input() initialValue ?: string;
  imgSrc : string = "/assets/images/default.png";

  constructor() { }

  ngOnInit(): void {
    if(this.initialValue)
    {
      if(this.initialValue.length > 0)
      {
        this.imgSrc = this.initialValue;
      }
    }
  }

  onFileSelect(eventTarget : EventTarget) : void {

    let inputElement = (eventTarget as HTMLInputElement);

    if(inputElement.files != null)
    {
      const file = inputElement.files[0];

      var reader = new FileReader();

      if(file)
        reader.readAsDataURL(file);

      const self = this;

      reader.onload = function()  {
        self.imgSrc = reader.result as string;
        self.base64.emit(reader.result as string);
      };

    }
    else {
      console.log("Problem during uploading a file!");
    }
  }

}
