const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
    origin: 'https://one553bajaj-4.onrender.com', // Your client-side domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API! Use /api/data for POST and GET requests.');
});

app.post('/api/data', (req, res) => {
    const { data } = req.body;
    
    // Check if the input data is provided
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input data format"
        });
    }

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    // Process the data
    data.forEach(item => {
        if (typeof item === 'string') {
            if (isNaN(item)) {
                // It's an alphabet
                if (/^[a-z]$/.test(item)) {
                    alphabets.push(item);
                    if (highestLowercaseAlphabet === null || item > highestLowercaseAlphabet) {
                        highestLowercaseAlphabet = item;
                    }
                } else if (/^[A-Z]$/.test(item)) {
                    alphabets.push(item);
                }
            } else {
                // It's a number
                numbers.push(item);
            }
        }
    });

    // Construct response
    res.json({
        is_success: true,
        user_id: "vidya06062004",
        email: "vidyaa265@gmail.com",
        roll_number: "21BAI1553",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

app.get('/api/data', (req, res) => {
    res.json({
        operation_code: "OP123456"
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
