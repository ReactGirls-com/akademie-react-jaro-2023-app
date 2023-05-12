import React, { useState } from "react";
import "./App.css";

function OpenAI() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  const generateResponse = async (input) => {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: input }),
    });
    const data = await response.json();
    return data;
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleGenerateResponse = async () => {
    setHistory([...history, input]); // foR testing purpose
    // const response = await generateResponse(input);
    // setResponse(response);
    //setHistory([...history, response]);
    setInput("");
  };

  // add short or long answer checkbox

  return (
    <div className="app-container">
      <h1>OpenAI Response Generator</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter your input here"
      />
      <button onClick={handleGenerateResponse}>Generate Response</button>
      {response && (
        <div>
          <h2>Generated Response:</h2>
          <p>{response}</p>
        </div>
      )}
      {history.length > 0 && (
        <div>
          <h2>History:</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OpenAI;
