import { Component, OnInit } from '@angular/core';
import { SeriesListService } from './series-list.service';
import { Series } from '../models/series';

@Component({
    providers: [SeriesListService],
    selector: 'app-series-list',
    templateUrl: './series-list.component.html',
    styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
    seriesList: Series[];

    constructor (public seriesListService: SeriesListService) {}

    ngOnInit() {
        this.seriesListService
            .getSeriesList()
            .subscribe(seriesList => {
                this.seriesList = seriesList;
            })
    }
}
