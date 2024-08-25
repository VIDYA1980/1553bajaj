const functions = require('firebase-functions');
const express = require('express');
const app = express();
app.use(express.json());

// Helper function to process the input data
const processData = (data) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = null;

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/[a-zA-Z]/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
          highestLowercaseAlphabet = item;
        }
      }
    }
  });

  return {
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  };
};

// POST endpoint to process input data
app.post('/api/data', (req, res) => {
  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid input format"
    });
  }

  const processedData = processData(data);
  res.status(200).json({
    is_success: true,
    user_id: "vidya06062004",
    email: "vidyaa265@gmail.com",
    roll_number: "21BAI1553",
    ...processedData
  });
});

// GET endpoint to return an operation code
app.get('/api/data', (req, res) => {
  res.status(200).json({
    operation_code: "OP12345"
  });
});

// Export the API as a Firebase Function
exports.api = functions.https.onRequest(app);
