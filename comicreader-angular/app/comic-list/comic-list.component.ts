import { Component, OnInit } from '@angular/core';
import { Comic } from '../models/comic';
import { Series } from 'app/models/series';
import { ComicListService } from './comic-list.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    providers: [ComicListService],
    selector: 'app-comic-list',
    template: `
        <header class="content-header row">
            <div class="col">
                <h1>These are your comics</h1>
            </div>
        </header>

        <p><a class="btn btn-primary" routerLink="/">Back</a></p>

        <table class="table">
            <thead class="thead-inverse">
            <tr>
                <th>#</th>
                <th>Series name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody *ngIf="comicList">
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
        private seriesListService: ComicListService
    ) {}

    ngOnInit() {
        const seriesId = this.route.snapshot.paramMap.get('id');
        this.seriesListService
            .getSeriesDetail(seriesId)
            .subscribe(series => {
                this.comicList = series.comics;
                this.series = series;
            })
    }
}
