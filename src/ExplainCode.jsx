import React, { useState } from "react";

// const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_KEY = "";

const ExplainCode = () => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  const handleCallOpenAIAPI = async () => {
    setLoading(true);
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setExplanation(data.choices[0].text);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const handleNoInput = () => {
    setEmptyInput(true);
    setTimeout(() => {
      setEmptyInput(false);
    }, 3000);
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

      <button onClick={code !== "" ? handleCallOpenAIAPI : handleNoInput}>
        Explain
      </button>
      {explanation !== "" ? <p>{explanation}</p> : null}
      {error ? <p>{error.message}</p> : null}
      {emptyInput ? <p>Please enter some code</p> : null}
      {loading ? <p>Loading...</p> : null}
    </div>
  );
};

export default ExplainCode;
