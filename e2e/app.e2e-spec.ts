import { ReaderPage } from './app.po';

describe('reader App', () => {
  let page: ReaderPage;

  beforeEach(() => {
    page = new ReaderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
