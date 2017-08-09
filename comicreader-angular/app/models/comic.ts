export class Comic {
    id: number;
    title: string;
    author: string;
    pages: string[];
    series: number;
    preview_img: string;

    getNumPages () {
        return this.pages.length;
    }

    getPage (index: number): string {
        return this.pages[index];
    }
}
