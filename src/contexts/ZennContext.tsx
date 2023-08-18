import { createContext, useContext, useState, useEffect } from 'react';
import { zennType } from '../types/zennTypes';

const ZennContentContext = createContext<zennType | undefined>(undefined);

export const useZennContentContext = () => {
  return useContext(ZennContentContext);
}

export const ZennContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fileNames, setFileNames] = useState({ articles: [], books: [] });

  const [zennDirPath, setZennDirPath] = useState<zennType['zennDirPath']>('/Users/urchin/ryuwa/zenn-content');
  const [selectedFile, setSelectedFile] = useState<zennType['selectedFile']>({
    label: localStorage.getItem('selected_label') || '',
    file: localStorage.getItem('selected_file') || '',
  });

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
      selectedFile,
      setZennDirPath,
      setSelectedFile
      }}>
      {children}
    </ZennContentContext.Provider>
  );
}
