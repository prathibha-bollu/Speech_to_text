import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import "./App.css";

const App = () => {
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });

  useEffect(() => {
    setTextToCopy(transcript); // update when new speech comes in
  }, [transcript]);

  const startListening = () => 
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn’t support speech recognition.</p>;
  }

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <p>Edit the captured text below if something is wrong</p>

      <textarea
        className="main-content"
        value={textToCopy}
        onChange={(e) => setTextToCopy(e.target.value)} // make editable
      />

      <div className="btn-style">
        <button onClick={setCopied}>{isCopied ? 'Copied!' : 'Copy to clipboard'}</button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      </div>
    </div>
  );
};

export default App;
