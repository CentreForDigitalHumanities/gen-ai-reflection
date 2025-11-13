import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AskForLeaveService {
    handler: EventListenerOrEventListenerObject;
    public leaveAsked$ = new Subject<void>();

    constructor() {
        this.handler = (event) => {
            event?.preventDefault();
            event.returnValue = true; // Deprecated, but still recommended by MDN
            this.leaveAsked$.next();
        }
    }

    preventLeave() {
        window.addEventListener("beforeunload", this.handler);
    }

    allowLeave() {
        window.removeEventListener("beforeunload", this.handler);
    }
}
