import { Component, OnInit } from '@angular/core';
import { Comic } from '../models/comic';
import { Series } from 'app/models/series';
import { ComicListService } from './comic-list.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    providers: [ComicListService],
    selector: 'app-comic-list',
    templateUrl: './comic-list.component.html',
    styleUrls: ['./comic-list.component.css']
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
