import { Component, Input, OnInit } from '@angular/core';
import { Comic } from '../models/comic';
import { ReaderService } from './reader.service';

@Component({
    providers: [ReaderService],
    selector: 'app-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
    @Input('comicId') comicId: number;

    private currentPageNum: number;

    private comic: Comic;
    private pageLoading: boolean;

    constructor (public readerService: ReaderService) {
        this.currentPageNum = 0;
        this.pageLoading = false;
    }

    ngOnInit() {
        this.readerService
            .getComic(this.comicId)
            .subscribe(comic => {
                this.comic = new Comic();
                this.comic.id = comic.id;
                this.comic.title = comic.title;
                this.comic.author = comic.author;
                this.comic.pages = comic.pages;
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
