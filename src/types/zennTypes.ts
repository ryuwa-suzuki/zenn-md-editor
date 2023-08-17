type Book = {
  bookName: string;
  files: Array<string>;
};
export type zennType = {
  zennDirPath: string;
  fileNames: {
    articles: Array<string>,
    books: Array<Book>
  };
  setZennDirPath: (zennDirPath: string) => void;
};
