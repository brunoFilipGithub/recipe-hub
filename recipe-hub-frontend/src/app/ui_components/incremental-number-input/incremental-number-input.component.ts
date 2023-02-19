import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, AfterViewChecked, ChangeDetectorRef, Input } from '@angular/core';
import { MUnits } from './measuring-units';

@Component({
  selector: 'app-incremental-number-input',
  templateUrl: './incremental-number-input.component.html',
  styleUrls: ['./incremental-number-input.component.scss']
})
export class IncrementalNumberInputComponent implements OnInit {

  value : number = 1;
  manualValue : string = "";

  manualValueEditing : boolean = false;
  timeoutHandler : any;

  @Output() valueEmitter : EventEmitter<any> = new EventEmitter<any>();
  @Input() setValue ?: number;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {

    if (this.manualValueEditing == true) {

      if (this.manualValue.length > 0 && e.key == "Backspace") {
        this.manualValue = this.manualValue.substring(0, this.manualValue.length - 1);
      }

      if (this.manualValue.length < 3) {
        if (e.key == "1") {
          this.manualValue += e.key;
        }
        else if (e.key == "2") {
          this.manualValue += e.key;
        }
        else if (e.key == "3") {
          this.manualValue += e.key;
        }
        else if (e.key == "4") {
          this.manualValue += e.key;
        }
        else if (e.key == "5") {
          this.manualValue += e.key;
        }
        else if (e.key == "6") {
          this.manualValue += e.key;
        }
        else if (e.key == "7") {
          this.manualValue += e.key;
        }
        else if (e.key == "8") {
          this.manualValue += e.key;
        }
        else if (e.key == "9") {
          this.manualValue += e.key;
        }
        else if (e.key == "0") {
          this.manualValue += e.key;
        }
      }

      if(e.key == "Enter")
      {
        this.manualValueEditing = false;

        if(this.manualValue.length == 0)
        {
          this.value = 1;
        }
        else {
          this.value = parseInt(this.manualValue);
        }

        this.emitValue();
      }
    }

    console.log(this.manualValue);
  }

  constructor(private el : ElementRef, private change : ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.setValue){
      this.value = this.setValue;
    }
  }

  manuallyChangeValue() {
    this.value = 0;
    this.manualValueEditing = true;
  }

  inc() : void {
    this.timeoutHandler = setInterval(() => this.value += 1, 45)
    this.value += 1;
  }

  dec() : void {
      this.timeoutHandler = setInterval(() =>
      {
          console.log("dec")
          if(this.value > 1)
            this.value -= 1;
      }, 45);
  }

  clear() : void {
    clearInterval(this.timeoutHandler);
    this.timeoutHandler = null;

    this.emitValue();
  }

  emitValue() : void {
    this.valueEmitter.emit(this.value);
  }
}
