import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Validate JSON
    const validateJson = (input) => {
        try {
            JSON.parse(input);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateJson(jsonInput)) {
            setError('Invalid JSON format');
            return;
        }

        setError('');
        setShowDropdown(true);

        try {
            const res = await axios.post('https://one553bajaj-6.onrender.com/api/data', JSON.parse(jsonInput));
            setResponse(res.data);
        } catch (error) {
            setError('Error connecting to API');
        }
    };

    // Render response
    const renderResponse = () => {
        if (response) {
            return (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="App">
            <h1>JSON API Interface</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="jsonInput">JSON Input:</label>
                    <textarea
                        id="jsonInput"
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        rows="10"
                        cols="50"
                        placeholder='Enter valid JSON here'
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderResponse()}
            {showDropdown && (
                <div>
                    <label htmlFor="responseOptions">Select an option:</label>
                    <select id="responseOptions">
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highestLowercase">Highest lowercase alphabet</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default App;
