const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Constants
const userID = "vidya06062004";
const email = "vidyaa265@gmail.com";
const rollNumber = "21BAI1553";

// Helper function to categorize and process input data
const processData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.match(/[a-zA-Z]/)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    return {
        numbers,
        alphabets,
        highestLowercaseAlphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };
};

// POST endpoint
app.post('/api/data', (req, res) => {
    const data = req.body;
    const processedData = processData(data);

    res.json({
        status: 'success',
        user_id: userID,
        email,
        roll_number: rollNumber,
        ...processedData
    });
});

// GET endpoint
app.get('/api/data', (req, res) => {
    res.json({
        operation_code: 'OP1234'
    });
});

// Root route (Optional)
app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /api/data for endpoints.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
