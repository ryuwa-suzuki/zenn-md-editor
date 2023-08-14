import { useMemo } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import SimpleMDE from "easymde";
import "easymde/dist/easymde.min.css";
const toolbar: SimpleMDE.Options["toolbar"] = [
  'bold',
  'italic',
  'quote',
  'unordered-list',
  'ordered-list',
  'link',
  'image',
  'strikethrough',
  'code',
  'table',
  'redo',
  'heading',
  'undo',
  'clean-block',
  'horizontal-rule',
  'preview',
  'side-by-side',
  'fullscreen'
];

const delay = 1000; // 1秒後に保存されるように設定

const MarkdownEditor: React.FC = () => {
  const value = localStorage.getItem('smde_saved_content') || ""; // リロード時にローカルストレージの値をバリューにセット
  const mdeOptions: SimpleMDE.Options = useMemo(() => {
    return {
      width: 'auto',
      spellChecker: false,
      toolbar,
      autosave: {
        enabled: true,
        uniqueId: "saved_content",
        delay
      },
    };
  }, []);

  return (
    <SimpleMdeReact
      id="simple-mde"
      options={mdeOptions}
      value={value}/>
  );
};

export default MarkdownEditor;
