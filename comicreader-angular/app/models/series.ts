export class Series {
    id: number;
    title: string;
    author: string;
    year: string;
    preview_img: string;
    comics: number[];

    getNumComics () {
        return this.comics.length;
    }
}
