import React,{useState,useEffect} from 'react';
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage"



function App() {
const [html,setHtml] = useLocalStorage('html',"")
const [css,setCss] = useLocalStorage('css',"")
const [javascript,setJavascript] = useLocalStorage('js',"")
const [srcdoc, setSrcDoc] = useState("")

useEffect(()=>{
  const timeout = setTimeout(()=>{
    setSrcDoc(`
    <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${javascript}</script>
    </html>
  `)
  },250)

  return () => clearTimeout(timeout)
},[html,css,javascript])


  return (
    <>
    <div className="pane top-pane">
          <Editor 
              language="xml"
              displayName="Html"
              value={html}
              onChange={setHtml}
          />
          <Editor
              language="css"
              displayName="CSS"
              value={css}
              onChange={setCss}
          />
          
          <Editor
              language="javascript"
              displayName="JS"
              value={javascript}
              onChange={setJavascript}
          />

    </div>

    <div className="pane">

          <iframe srcDoc={srcdoc} title="output" width="100%" height="100%" frameBorder="0" sandbox="allow-scripts" />

    </div>
    </>
  );
}

export default App;
