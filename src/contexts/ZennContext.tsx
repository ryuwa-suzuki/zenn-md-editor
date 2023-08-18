import { createContext, useContext, useState, useEffect } from 'react';
import { zennType } from '../types/zennTypes';

const ZennContentContext = createContext<zennType | undefined>(undefined);

export const useZennContentContext = () => {
  return useContext(ZennContentContext);
}

export const ZennContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fileNames, setFileNames] = useState({ articles: [], books: [] });
  const [isZennSynced, setIsZennSynced] = useState<zennType['isZennSynced']>(localStorage.getItem('zenn_dir_path') ? true : false);
  const [zennDirPath, setZennDirPath] = useState<zennType['zennDirPath']>(localStorage.getItem('zenn_dir_path') || '');
  const [selectedFile, setSelectedFile] = useState<zennType['selectedFile']>({
    label: localStorage.getItem('selected_label') || '',
    file: localStorage.getItem('selected_file') || '',
  });

  const syncWithZenn = async () => {
    if (!zennDirPath) {
      setIsZennSynced(false);
      return;
    }

    try {
      const files = await window.api.syncWithZenn(zennDirPath);
      setIsZennSynced(true);
      setFileNames(files);
    } catch (error) {
      alert('エラーが発生しました')
      setIsZennSynced(false);
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
      isZennSynced,
      setZennDirPath,
      setSelectedFile,
      syncWithZenn,
      setIsZennSynced
      }}>
      {children}
    </ZennContentContext.Provider>
  );
}
