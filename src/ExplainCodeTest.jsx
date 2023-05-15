import React, { useEffect, useState } from "react";

const API_KEY = "";

const ExplainCodeTest = () => {
  const [code, setCode] = useState("");

  const handleCallOpenAIAPI = async () => {
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Explain this code: " + code,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['"""'],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Explain Code</h1>

      <textarea
        placeholder="Enter your code here"
        cols={50}
        rows={10}
        onChange={(event) => setCode(event.target.value)}
      />

      <button onClick={handleCallOpenAIAPI}>Explain</button>
    </div>
  );
};

export default ExplainCodeTest;
