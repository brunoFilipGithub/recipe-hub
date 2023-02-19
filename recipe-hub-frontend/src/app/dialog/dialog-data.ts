import { ComponentRef, Type } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { Tab } from "./tab";

export enum DialogActions {
    None,                   // No buttons
    MessageDialogActions,   // Ok button
    TabActions,             // Tab buttons
    Default                 // Ok and Cancle buttons
}

export interface DialogData {
    dialogBodyComponentRef : ComponentRef<DialogComponent>;
    dialogChildComponentType ?: Type<any>; // dialog content
    dialogChildComponentRef ?: ComponentRef<any>;
    tabs ?: Tab[];
    dialogActions ?: DialogActions;
    data : { title : string, text ?: string };
}