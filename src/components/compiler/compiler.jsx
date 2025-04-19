

import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import "./compiler.css";

const LANGUAGE_OPTIONS = [
  { label: "Python 3", id: 71, monaco: "python", template: 'print("Hello, World!")' },
  { label: "JavaScript (Node.js)", id: 63, monaco: "javascript", template: 'console.log("Hello, World!")' },
  { label: "C++", id: 54, monaco: "cpp", template: '#include <iostream>\nint main(){ std::cout<<"Hello, World!"; }' },
  { label: "Java", id: 62, monaco: "java", template: 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }' },
];

export default function Compiler() {
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0]);
  const [code, setCode] = useState(language.template);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    try {
      const { data } = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: language.id,
        },
        {
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "ffbc1a96b4msh6b3cc980c95a19dp19b074jsn4b2d67fb6c18",
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(data.stdout || data.stderr || "No output");
    } catch {
      setOutput("Error executing code");
    }
    setLoading(false);
  };

  const handleLanguageChange = (e) => {
    const selected = LANGUAGE_OPTIONS.find(lang => lang.id === +e.target.value);
    setLanguage(selected);
    setCode(selected.template);
    setOutput("");
  };

  return (
    <div className="compiler">
      <div className="compiler-controls">
        <select value={language.id} onChange={handleLanguageChange}>
          {LANGUAGE_OPTIONS.map(lang => (
            <option key={lang.id} value={lang.id}>{lang.label}</option>
          ))}
        </select>
        <button className="common-btn" onClick={runCode} disabled={loading}>
          {loading ? "Running…" : "Run Code"}
        </button>
      </div>

      <MonacoEditor
        language={language.monaco}
        theme="vs-dark"
        value={code}
        options={{ automaticLayout: true }}
        onChange={setCode}
        height="300"
      />

      <pre className="output">{output}</pre>
    </div>
  );
}
