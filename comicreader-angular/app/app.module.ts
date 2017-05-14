import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ReaderComponent } from './reader/reader.component';
import { ComicListComponent } from './comic-list/comic-list.component'
import { SeriesListComponent } from './series-list/series-list.component'

@NgModule({
    declarations: [
        AppComponent,
        ReaderComponent,
        ComicListComponent,
        SeriesListComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
