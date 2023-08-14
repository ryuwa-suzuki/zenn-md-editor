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

const MarkdownEditor: React.FC = () => {
  const mdeOptions: SimpleMDE.Options = useMemo(() => {
    return {
      width: 'auto',
      spellChecker: false,
      toolbar
    };
  }, []);

  return (
    <SimpleMdeReact
      id="simple-mde"
      options={mdeOptions}/>
  );
};

export default MarkdownEditor;
