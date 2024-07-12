import { useEffect, useState } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react'
import Markdown from 'react-markdown'
import { useHotkeys } from 'react-hotkeys-hook'

function App() {




  const [fileContent, setFileContent] = useState('')
  const [filePath, setFilePath] = useState('')

  const handleOpenFile = async () => {
    const result = await window.electron.openFileDialog();
    if (result) {
      setFilePath(result.filePath);
      setFileContent(result.fileContent);
    }
  };

  useEffect(() => {
    document.addEventListener(
      'keydown',
      async function (e) {
        if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
          e.preventDefault()
          //your implementation or function calls
          console.log({ e })
          if (e.key === "s") {
           handleSaveFile()
          }
        }
      }, false);
  }, [])

  const handleSaveFile = async () => {
    console.log({ filePath, fileContent })
    if (filePath) {
      await window.electron.saveCurrentFile({ filePath, fileContent });
      alert('Archivo guardado exitosamente');
    } else {
      handleSaveFileAs();
    }
  };

  const handleSaveFileAs = async () => {
    const result = await window.electron.saveFileDialog({ filePath, fileContent });
    if (result) {
      setFilePath(result);
      alert('Archivo guardado exitosamente');
    }
  };



  return (
    <>
      <h1>MDEdit test</h1>

      <button onClick={handleOpenFile}>OPEN</button>
      <button onClick={handleSaveFile}>SAVE</button>
      <button onClick={handleSaveFileAs}>SAVE AS</button>

      <Editor
        defaultValue={fileContent}
        value={fileContent}
        height="50vh"
        theme="vs-dark"
        defaultLanguage="markdown"
        onChange={(e) => {
          console.log("changed");
          setFileContent(e)
        }}
      />
      {fileContent && <Markdown>{fileContent}</Markdown>}
    </>
  )
}

export default App
