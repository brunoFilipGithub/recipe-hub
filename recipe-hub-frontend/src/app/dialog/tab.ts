import { Component, ComponentRef, Type } from "@angular/core";

export interface Tab {
    tabType : Type<any>;
    tabTitle : string,
    tabComponent ? : ComponentRef<any>;
    tabResult ?: any;
}