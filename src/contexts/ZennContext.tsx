import { createContext, useContext, useState, useEffect } from 'react';
import { zennType } from '../types/zennTypes';

const ZennContentContext = createContext<zennType | undefined>(undefined);

export const useZennContentContext = () => {
  return useContext(ZennContentContext);
}

export const ZennContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fileNames, setFileNames] = useState({ articles: [], books: [] });

  const [zennDirPath, setZennDirPath] = useState<zennType['zennDirPath']>('/Users/urchin/ryuwa/zenn-content');

  const syncWithZenn = async () => {
    try {
      const files = await window.api.syncWithZenn(zennDirPath);
      setFileNames(files);
    } catch (error) {
      alert('エラーが発生しました')
    }
  };

  useEffect(() => {
    syncWithZenn();
  }, []);

  return (
    <ZennContentContext.Provider value={{
      fileNames,
      zennDirPath,
      setZennDirPath
      }}>
      {children}
    </ZennContentContext.Provider>
  );
}
