import { Observable, Subject } from "rxjs";

export interface ITabbable  {
    get ValueEmitter() : Observable<any>;
}