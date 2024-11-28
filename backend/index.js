const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = 5000;


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "write 5 asteriks each in one row in c++";

const func = async (prompt) => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

func(prompt)


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});





// // Example input message
// const msg = 'write code for 5 asterisks each in one row';

// // Mock Gemini API details (replace with real API details)
// const GEMINI_API_URL = 'https://gemini.api.endpoint'; // Replace with Gemini's API URL
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store your API key in .env file

// // Route to send input to Gemini LLM and get response
// app.get('/generate-code', async (req, res) => {
//     try {
//         const response = await axios.post(GEMINI_API_URL, {
//             prompt: msg,
//             max_tokens: 100,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${GEMINI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         res.send({
//             success: true,
//             input: msg,
//             output: response.data.choices[0].text.trim(),
//         });
//     } catch (error) {
//         console.error('Error communicating with Gemini API:', error.response?.data || error.message);
//         res.status(500).send({
//             success: false,
//             error: 'Failed to communicate with Gemini LLM. Check the server logs.',
//             details: error.response?.data || error.message,
//         });
//     }
    
// });



// Start the server

