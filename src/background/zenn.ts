import fs from 'fs';
import path from 'path';

export function syncWithZenn (ipcMain: Electron.IpcMain) {
  ipcMain.handle('sync-with-zenn', async (e, {zennDirPath}) => {
    if (!fs.existsSync(zennDirPath)) throw new Error('no-content');

    let articles = {};
    if (fs.existsSync(path.join(zennDirPath, 'articles'))) {
      articles = fs.readdirSync(path.join(zennDirPath, 'articles')).filter(file => file.endsWith('.md'));
    }

    let books = {};
    if (fs.existsSync(path.join(zennDirPath, 'books'))) {
      const booksDirs = fs.readdirSync(path.join(zennDirPath, 'books')).filter(file => {
        const filePath = path.join(zennDirPath, 'books', file);
        const stats = fs.statSync(filePath);

        return stats.isDirectory();
      });

      books = booksDirs.map((dirName) => {
        const bookfiles = fs.readdirSync(path.join(zennDirPath, 'books', dirName)).filter(file => file.endsWith('.md'));
        return {
          bookName: dirName,
          files: bookfiles
        }
      })
    }

    if (!Object.keys(articles).length && !Object.keys(books).length) {
      throw new Error('no');
    }

    return {
      articles: articles,
      books: books
    }
  })
}
