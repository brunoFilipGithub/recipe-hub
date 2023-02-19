import { outputAst } from '@angular/compiler';
import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Type, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DialogActions, DialogData } from './dialog-data';
import { DialogService } from './dialog.service';
import { InsertionDirective } from './insertion.directive';
import { ISubmittable } from './ISubmittable';
import { Tab } from './tab';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnInit, ISubmittable {

  @HostListener('mousedown', ['$event']) onClick(evt : MouseEvent) {
    if((evt.target as HTMLElement).getAttribute("class") == "dialog-background")
    {
      this.close();
    }
    evt.stopPropagation();
  }

  @ViewChild(InsertionDirective) insertionPoint !: InsertionDirective;
  @Input() dialogData !: DialogData;

  activeTab ?: Tab;
  dialogResult : any | null;
  dialogActions: typeof DialogActions = DialogActions;
  editMode : boolean = false;

  private readonly _close : Subject<any> = new Subject<any>();
  get OnClose() : Observable<any> {
    return this._close.asObservable();
  }

  get DialogChildComponentRef() : ComponentRef<any> | undefined  {
    return this.dialogData.dialogChildComponentRef;
  }
  set DialogChildComponentRef(ref : ComponentRef<any> |undefined)  {
    this.dialogData.dialogChildComponentRef = ref;
  }

  constructor(public dialogService : DialogService, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
    if(this.dialogData.tabs) {
      this.activeTab = this.dialogData.tabs[0];
    }

    if(!this.dialogData.dialogActions){
      this.dialogData.dialogActions = DialogActions.None;
    }
  }


  ngAfterViewInit(): void {
    if(this.dialogData.tabs) {
      this.loadTab(this.activeTab!);

      if(this.activeTab!.tabResult) {
        this.DialogChildComponentRef!.instance.initialValue = this.dialogData.tabs[0].tabResult;
        this.editMode = true;
      }
    }
    else if(this.dialogData.dialogChildComponentType){
      this.DialogChildComponentRef = this.createChildComponent(this.dialogData.dialogChildComponentType);
    }

    this.cdref.detectChanges();
  }


  get title() : string {
    return this.dialogData.data!.title!;
  }

  get isDialogMessage() : boolean {
    if(this.dialogData.data.text)
    {
      return true;
    } else return false;
  }

  createChildComponent(componentType: Type<any>) : ComponentRef<any> {
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentType);
  }
  
  close(result  ?: any)  {
    this.dialogService.destroyDialog(this.dialogData.dialogBodyComponentRef, result);
    this._close.next(result);
  }

  onNextTab() {
    if(this.DialogChildComponentRef!.instance.onSubmit()){
    let currentIndex = this.dialogData.tabs!.indexOf(this.activeTab!);
    this.activeTab = this.dialogData.tabs![currentIndex+1];
    this.loadTab(this.activeTab!);
    }
  }

  loadTab(tab : Tab) {
    if(this.dialogData.dialogChildComponentType != tab.tabType)
    {
      this.DialogChildComponentRef = this.createChildComponent(tab.tabType);
      this.dialogData.dialogChildComponentType = tab.tabType;

      if(tab.tabResult)
        this.DialogChildComponentRef.instance.initialValue = tab.tabResult;


      this.DialogChildComponentRef.instance.ValueEmitter.subscribe((res : any)=> {
        this.activeTab!.tabResult = res;
      });
    }
  }

  onSubmit() {
    if(this.dialogData.tabs)
    {
      
      this.DialogChildComponentRef!.instance.onSubmit();
      this.dialogResult = new Array();
      
      for(let i = 0; i < this.dialogData.tabs!.length; i++)
      {
        this.dialogResult.push(this.dialogData.tabs[i].tabResult); 
      }

      console.log(this.dialogResult);
      this.close(this.dialogResult);
      return true;
    }
    else {
      this.DialogChildComponentRef!.instance.ValueEmitter.subscribe((res : any)=> {
        this.close(res);
      });

      this.DialogChildComponentRef!.instance.onSubmit();
      return true;
    }
  }

}