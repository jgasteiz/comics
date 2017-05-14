import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Series } from '../models/series';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../app.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SeriesListService {
    constructor(private http: Http) {}

    getSeriesList(): Observable<Series[]> {
        return this.http
            .get(`/api/series/?token=${AppSettings.API_TOKEN}`)
            .map(res => res.json());
    }
}
