import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { DialogActions, DialogData } from './dialog-data';
import { DialogComponent } from './dialog.component';
import { Tab } from './tab';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public openDialog(_dialogActions : DialogActions, _title : string, _contentComponentType : Type<any>) : ComponentRef<DialogComponent>  {
    let dialog = this.createDialogComponent();

    let dialogData : DialogData = { dialogActions : _dialogActions, dialogBodyComponentRef : dialog, dialogChildComponentType : _contentComponentType, data : { title : _title} };
    dialog.instance.dialogData = dialogData; 

    return dialog; 
  }

  public openMessageDialog(_title : string, _text : string, isError ?: boolean) : ComponentRef<DialogComponent> {
    let messageDialog = this.createDialogComponent();

    let dialogData : DialogData = { dialogActions : DialogActions.MessageDialogActions, dialogBodyComponentRef : messageDialog, data : { title: _title, text : _text}};
    messageDialog.instance.dialogData = dialogData;

    return messageDialog; 
  }

  public openDialogWithTabs(_title : string, _tabs : Tab[]) : ComponentRef<DialogComponent>  {
    let dialog = this.createDialogComponent();

    let dialogData : DialogData = { dialogActions : DialogActions.TabActions, dialogBodyComponentRef : dialog, tabs : _tabs, data : { title : _title} };
    dialog.instance.dialogData = dialogData; 

    return dialog; 
  }

  private createDialogComponent() : ComponentRef<DialogComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(componentRef.hostView);
 
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return componentRef;
  }

  public destroyDialog(dialog : ComponentRef<DialogComponent> | null, result ?: any) : any{
    this.appRef.detachView(dialog!.hostView);
    dialog!.destroy();

    if(result)
      return result;
    else return null;
  }
}
