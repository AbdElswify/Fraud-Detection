import React, { useState } from 'react';
import axios from 'axios';
import './EmailFraudDetector.css';


const EmailFraudDetector = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const analyzeEmail = async () => {
    try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a fraud expert bot that helps analyze writing samples for potential fraud.`,
              },
              {
                role: "user",
                content: `What is the likelihood that the following email "${input}" is fraud. Provide a confidence percent rating from a 0-100 (higher rating should indicate a higher likelihood of fraud) and then explain your reasoning in bullet points. The format of the response should match the following "Confidence Rating: X%                              Reasoning:".`
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': '---', // replace with your actual API key
            },
          },
        );

    const generatedText = response.data.choices[0].message.content;
      // Update the result state with response from the API
      setResult(generatedText);
    } catch (error) {
      console.error('Error analyzing email:', error);
    }
  };

  

  return (
    <div className="emailFraudDetector">
      <h1>Email Fraud Detector</h1>
      <textarea 
        value={input} 
        onChange={handleInputChange} 
        placeholder="Enter email text here..."
      />
      <button onClick={analyzeEmail}>Analyze</button>
      <h2>Result:</h2>
      <p>{result}</p>
    </div>
  );
};
/*
async function getEmails() {
    const gmail = google.google.gmail({ version: 'v1', auth: 'your-auth-object' });
    const res = await gmail.users.messages.list({ userId: 'me' });

    for (let message of res.data.messages) {
        const email = await gmail.users.messages.get({
            userId: 'me',
            id: message.id
        });

        const emailBody = email.data.payload.body.data;
        const emailContent = Buffer.from(emailBody, 'base64').toString('utf8');

        const fraudulenceAnalysis = await analyzeEmailForFraudulence(emailContent);

        if (fraudulenceAnalysis.includes('high likelihood')) {
            console.log(`Email with ID ${message.id} is likely fraudulent.`);
        }
    }
}

getEmails();
*/
export default EmailFraudDetector;
