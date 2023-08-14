import { useMemo } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import SimpleMDE from "easymde";
import { marked } from "marked";
import hljs from 'highlight.js';
import "easymde/dist/easymde.min.css";
import "highlight.js/styles/base16/bright.css"; //👉 https://highlightjs.org/examples

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
  const value = localStorage.getItem('smde_saved_content') || ""; // リロード時にローカルストレージの値をSimpleMdeReactコンポーネントのvalueとしてセット

  const previewRender = (value: string): string => {
    const renderer = new marked.Renderer();
    renderer.code = (code, codeInfo) => {
      const codeInfoSplit = codeInfo.split(':');
      const lang = codeInfoSplit[0]
      const fileName = codeInfoSplit[1];
      const langClass = hljs.getLanguage(lang) ? lang : 'plaintext';
      const highlightedCode = hljs.highlight(langClass, code).value;
      const codeBlockClass = fileName === undefined ? 'code-block-no-info' : 'code-block';

      let codeBlock = `<code class="hljs ${codeBlockClass} language-${langClass}">${highlightedCode}</code>`
      if (fileName !== undefined) {
        codeBlock = `<div class="code-info"><span>${fileName}</span></div>` + codeBlock
      }
      return `<pre>${codeBlock}</pre>`
    };

    return marked(value, { renderer });
  };

  const mdeOptions: SimpleMDE.Options = useMemo(() => {
    return {
      width: 'auto',
      spellChecker: false,
      toolbar,
      previewRender,
      autosave: {
        enabled: true,
        uniqueId: "saved_content",
        delay
      },
    };
  }, [previewRender]);

  return (
    <SimpleMdeReact
      id="simple-mde"
      options={mdeOptions}
      value={value}/>
  );
};

export default MarkdownEditor;
