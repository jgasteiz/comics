import { Component, OnInit } from '@angular/core';

import { Series } from '../../models/series';
import { ComicDashboardService } from '../../services/comic-dashboard.service';

@Component({
    providers: [ComicDashboardService],
    selector: 'app-series-list',
    template: `
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Series</li>
        </ol>

        <table class="table">
            <thead class="thead-inverse">
            <tr>
                <th>#</th>
                <th>Series name</th>
                <th>Authors</th>
                <th>Year</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr *ngFor="let series of seriesList; let i = index">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                        <img class="comic-preview" src="{{ series.preview_img }}" alt="{{ series.title }}">
                        {{ series.title }}
                    </td>
                    <td>
                        {{ series.author }}
                    </td>
                    <td>
                        {{ series.year }}
                    </td>
                    <td>
                        <a class="btn btn-primary" routerLink="/series/{{ series.id }}/">View series</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `
})
export class SeriesListComponent implements OnInit {
    seriesList: Series[];

    constructor (public comicDashboardService: ComicDashboardService) {
        this.seriesList = [];
    }

    ngOnInit() {
        this.comicDashboardService
            .getSeriesList()
            .subscribe(seriesList => {
                this.seriesList = seriesList;
            })
    }
}
