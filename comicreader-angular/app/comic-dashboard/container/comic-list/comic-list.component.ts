import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Comic } from '../../models/comic';
import { Series } from '../../models/series';
import { ComicDashboardService } from '../../services/comic-dashboard.service';

@Component({
    providers: [ComicDashboardService],
    selector: 'app-comic-list',
    template: `
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/">Series</a></li>
          <li class="breadcrumb-item active"><span>{{ series?.title }}</span></li>
        </ol>

        <table class="table">
            <thead class="thead-inverse">
            <tr>
                <th>#</th>
                <th>Comic name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr *ngFor="let comic of comicList; let i = index">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                        <img class="comic-preview"
                             [src]="comic.preview_img"
                             alt="{{ comic.title }}">
                        {{ comic.title }}
                    </td>
                    <td>
                        <a class="btn btn-primary" routerLink="/comic/{{ comic.id }}">Read comic</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `
})
export class ComicListComponent implements OnInit {
    series: Series;
    comicList: Comic[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private comicDashboardService: ComicDashboardService
    ) {
        this.comicList = [];
    }

    ngOnInit() {
        const seriesId = this.route.snapshot.paramMap.get('id');
        this.comicDashboardService
            .getSeriesDetail(seriesId)
            .subscribe(series => {
                this.comicList = series.comics;
                this.series = series;
            })
    }
}
