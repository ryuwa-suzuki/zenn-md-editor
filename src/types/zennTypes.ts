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
  selectedFile: {
    label: string;
    file: string;
  };
  setSelectedFile: (selected: { label: string, file: string }) => void;
  setZennDirPath: (zennDirPath: string) => void;
};
