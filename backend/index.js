const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())

const port = 5000;
let chatArray = []


// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate a response from the AI model
const func = async (prompt) => {
    try {
        console.log('Prompt:', prompt);

        const result = await model.generateContent(prompt);

        const responseText = result.response.text();
        console.log('/nResult:', responseText);

        return responseText

    } catch (error) {

        console.error('Error generating content:', error.message);
        return error;

    }
};

// POST endpoint to handle user queries
app.post('/user-query', async (req, res) => { 

    try {
        let prompt = req.body.message; // Explicitly extract `prompt` from the request body
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }
        const responseText = await func(prompt);
    
        if(responseText) {
            const chat = { message: prompt, response: responseText };
        
            chatArray = [...chatArray, chat];
            console.log(chatArray);

            res.json(chatArray)
        }
        else{
            console.log('couldnt process response');
        }
    
    } catch (err) {
        console.error('Error handling user query:', err.message);
        res.status(500).json({ message: "Error processing the request", error: err.message });
    }

});

// GET endpoint to fetch all chat history
app.get('/response', (req, res) => {
    res.json(chatArray);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
