import { MyWebsitePage } from './app.po';

describe('my-website App', () => {
  let page: MyWebsitePage;

  beforeEach(() => {
    page = new MyWebsitePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
