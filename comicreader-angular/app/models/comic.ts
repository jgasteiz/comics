export class Comic {
    id: number;
    title: string;
    author: string;
    pages: string[];

    getNumPages () {
        return this.pages.length;
    }
}
