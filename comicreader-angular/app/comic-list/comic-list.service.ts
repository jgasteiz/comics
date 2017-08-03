import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Series } from '../models/series';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../app.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ComicListService {
    constructor(private http: Http) {}

    getSeriesDetail(seriesId: string): Observable<Series> {
        return this.http
            .get(`/api/series/${seriesId}/?token=${AppSettings.API_TOKEN}`)
            .map(res => res.json());
    }
}
