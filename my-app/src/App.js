import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('{"data": ["M", "1", "334", "4", "B", "Z", "a"]}');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedData = JSON.parse(jsonInput);
      
      // Check if the input data is correctly formatted
      if (!parsedData || !Array.isArray(parsedData.data)) {
        throw new Error('Input must be an object with a "data" array');
      }

      // Post JSON data to API
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      const result = await res.json();
      
      if (result.is_success) {
        setResponse(result);
        setError('');
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const filteredData = {
      numbers: selectedFilters.includes('Numbers') ? numbers : [],
      alphabets: selectedFilters.includes('Alphabets') ? alphabets : [],
      highestLowercaseAlphabet: selectedFilters.includes('Highest lowercase alphabet') ? highest_lowercase_alphabet : []
    };

    return (
      <div>
        <h3>Filtered Response</h3>
        <p><strong>Numbers:</strong> {filteredData.numbers.join(', ')}</p>
        <p><strong>Alphabets:</strong> {filteredData.alphabets.join(', ')}</p>
        <p><strong>Highest Lowercase Alphabet:</strong> {filteredData.highestLowercaseAlphabet.join(', ')}</p>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>JSON Input to API</h1>
      <textarea
        rows="6"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON data here, e.g., {"data": ["M", "1", "334", "4", "B", "Z", "a"]}'
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <div className="error">{error}</div>}
      
      {response && (
        <div className="filters">
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleFilterChange}
            /> Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleFilterChange}
            /> Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest lowercase alphabet"
              onChange={handleFilterChange}
            /> Highest lowercase alphabet
          </label>
        </div>
      )}

      {renderFilteredResponse()}
    </div>
  );
}

export default App;
