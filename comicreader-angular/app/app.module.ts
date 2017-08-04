import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ReaderComponent } from './reader/reader.component';
import { ComicListComponent } from './comic-list/comic-list.component'
import { SeriesListComponent } from './series-list/series-list.component'

const appRoutes: Routes = [
    {
        path: 'comic/:id',
        component: ReaderComponent
    },
    {
        path: 'series/:id',
        component: ComicListComponent
    },
    {
        path: '',
        component: SeriesListComponent,
        data: { title: 'Series List' }
    }
];

@NgModule({
    declarations: [
        AppComponent,
        ReaderComponent,
        ComicListComponent,
        SeriesListComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
