import { Component, ElementRef } from '@angular/core';

export class AppSettings {
   public static API_TOKEN: string;
}

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    constructor(elm: ElementRef) {
        AppSettings.API_TOKEN = elm.nativeElement.attributes.apiToken.value;
    }
}
