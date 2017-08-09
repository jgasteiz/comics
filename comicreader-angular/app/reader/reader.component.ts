import { Component, Input, OnInit } from '@angular/core';
import { Comic } from '../models/comic';
import { ReaderService } from './reader.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    providers: [ReaderService],
    selector: 'app-reader',
    styleUrls: ['reader.component.scss'],
    template: `
        <div class="reader" *ngIf="comic">
            <div class="reader__page-wrp">
                <button routerLink="/series/{{ comic.series }}" class="reader__exit">Exit</button>
                <button (click)="previousPage($event)" class="reader__previous-page">Previous page</button>
                <button (click)="nextPage($event)" class="reader__next-page">Next page</button>
                <img class="reader__page-img"
                     [src]="comic.getPage(currentPageNum)"
                     alt="Page {{ currentPageNum }}">
                <img *ngIf="pageLoading" class="reader__loading" src="/static/img/loading.gif" alt="">
            </div>
        </div>
    `
})
export class ReaderComponent implements OnInit {
    currentPageNum: number;

    comic: Comic;
    pageLoading: boolean;

    constructor (
        private route: ActivatedRoute,
        private router: Router,
        private readerService: ReaderService
    ) {
        this.currentPageNum = 0;
        this.pageLoading = false;
    }

    ngOnInit() {
        const comicId = this.route.snapshot.paramMap.get('id');
        this.readerService
            .getComic(comicId)
            .subscribe(comic => {
                this.comic = new Comic();
                this.comic.id = comic.id;
                this.comic.title = comic.title;
                this.comic.author = comic.author;
                this.comic.pages = comic.pages;
                this.comic.series = comic.series;
            })
    }

    nextPage(evt): void {
        this.currentPageNum += 1;
        if (this.currentPageNum > this.comic.getNumPages() - 1) {
            this.currentPageNum = this.comic.getNumPages() - 1;
        }
    }

    previousPage(evt): void {
        this.currentPageNum -= 1;
        if (this.currentPageNum < 0) {
            this.currentPageNum = 0;
        }
    }
}
