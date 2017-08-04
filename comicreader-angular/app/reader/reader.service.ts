import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Comic } from '../models/comic';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../app.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReaderService {
    constructor(private http: Http) {}

    getComic(comicId: string): Observable<Comic> {
        return this.http
            .get(`/api/comics/${comicId}/?token=${AppSettings.API_TOKEN}`)
            .map(res => res.json());
    }
}
