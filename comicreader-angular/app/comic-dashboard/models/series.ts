import { Comic } from './comic';

export class Series {
    id: number;
    title: string;
    author: string;
    year: string;
    preview_img: string;
    comics: Comic[];

    getNumComics () {
        return this.comics.length;
    }
}
