import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Comic } from '../models/comic';
import { Series } from '../models/series';

import { AppSettings } from '../../app.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ComicDashboardService {
    constructor(private http: Http) {}

    getSeriesList(): Observable<Series[]> {
        return this.http
            .get(`/api/series/?token=${AppSettings.API_TOKEN}`)
            .map(res => res.json());
    }

    getSeriesDetail(seriesId: string): Observable<Series> {
        return this.http
            .get(`/api/series/${seriesId}/?token=${AppSettings.API_TOKEN}`)
            .map(res => res.json());
    }

    getComic(comicId: string): Observable<Comic> {
        return this.http
            .get(`/api/comics/${comicId}/?token=${AppSettings.API_TOKEN}`)
            .map(res => res.json());
    }
}
