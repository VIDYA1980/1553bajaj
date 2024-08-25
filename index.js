// Importing required modules
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Function to extract numbers and alphabets from the string
const extractData = (inputString) => {
    const numbers = inputString.match(/\d+/g) || [];
    const alphabets = inputString.match(/[a-zA-Z]/g) || [];
    const lowercaseAlphabets = inputString.match(/[a-z]/g) || [];
    
    // Find the highest lowercase alphabet
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
        ? lowercaseAlphabets.sort().reverse()[0]
        : null;

    return {
        numbers,
        alphabets,
        highestLowercaseAlphabet
    };
};

// POST endpoint
app.post('/api/data', (req, res) => {
    const { userId, collegeEmail, collegeRollNumber, inputString } = req.body;

    if (!userId || !collegeEmail || !collegeRollNumber || !inputString) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields'
        });
    }

    const { numbers, alphabets, highestLowercaseAlphabet } = extractData(inputString);

    return res.status(200).json({
        status: 'success',
        userId,
        collegeEmail,
        collegeRollNumber,
        numbers,
        alphabets,
        highestLowercaseAlphabet: highestLowercaseAlphabet || 'No lowercase alphabet found'
    });
});

// GET endpoint
app.get('/api/data', (req, res) => {
    res.status(200).json({
        operation_code: 'OP123456'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
