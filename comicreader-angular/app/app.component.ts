import { Component, ElementRef } from '@angular/core';

export class AppSettings {
   public static API_TOKEN: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(elm: ElementRef) {
        AppSettings.API_TOKEN = elm.nativeElement.attributes.apiToken.value;
    }
}
