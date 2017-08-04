import { Component, Input, OnInit } from '@angular/core';
import { Comic } from '../models/comic';
import { ReaderService } from './reader.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    providers: [ReaderService],
    selector: 'app-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
    private currentPageNum: number;

    private comic: Comic;
    private pageLoading: boolean;

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
