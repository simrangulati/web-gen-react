import React, { useState } from 'react';

const GenerateWebData = () => {
  const [formData, setFormData] = useState({
    email: '',
    sandbox: 'sandbox123',
    schema_id: 'schema_xyz_001',
    num_users: 100,
    num_events: 100,
    time_range_days: 30,
    user_prompt: 'Generate basic commerce analytics data for testing'
  });
  
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseText, setResponseText] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setResponseText('');

    const requestData = {
      event_type: "web_data_new",
      event_types: ["page_view", "add_to_cart", "purchase"],
      num_users: parseInt(formData.num_users),
      num_events: parseInt(formData.num_events),
      time_range_days: parseInt(formData.time_range_days),
      output_format: "json",
      email: formData.email,
      sandbox: formData.sandbox,
      schema_id: formData.schema_id,
      user_prompt: formData.user_prompt
    };

    console.log('Making API request with data:', requestData);

    // Try multiple approaches to handle CORS
    const endpoints = [
      '/omnis-web-data-gen-latest', // Proxy approach
      'https://qs4ng286xa.execute-api.us-east-1.amazonaws.com/omnis-web-data-gen-latest', // Direct approach
      'https://cors-anywhere.herokuapp.com/https://qs4ng286xa.execute-api.us-east-1.amazonaws.com/omnis-web-data-gen-latest' // CORS proxy
    ];

    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(endpoint.includes('cors-anywhere') && {
              'Origin': window.location.origin,
              'X-Requested-With': 'XMLHttpRequest'
            })
          },
          mode: 'cors',
          body: JSON.stringify(requestData),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Content-Type:', response.headers.get('content-type'));

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        // Get the response as text first
        const responseText = await response.text();
        console.log('Raw response text:', responseText);
        setResponseText(responseText);

        // Try to parse as JSON
        let result;
        try {
          result = JSON.parse(responseText);
          console.log('Parsed JSON response:', result);
          setResponse(result);
        } catch (jsonError) {
          console.log('Response is not valid JSON, treating as text');
          setResponse({ 
            message: 'Response received (not JSON format)',
            rawResponse: responseText,
            contentType: response.headers.get('content-type')
          });
        }

        return; // Success, exit the function
      } catch (error) {
        console.error(`Error with endpoint ${endpoint}:`, error);
        lastError = error;
        continue; // Try next endpoint
      }
    }

    // If we get here, all endpoints failed
    console.error('All endpoints failed:', lastError);
    
    let errorMessage = lastError.message;
    
    if (lastError.name === 'TypeError' && lastError.message.includes('fetch')) {
      errorMessage = `Network error: ${lastError.message}. This might be due to CORS restrictions or the API endpoint being unavailable.`;
    } else if (lastError.message.includes('HTTP error')) {
      errorMessage = `Server error: ${lastError.message}`;
    }
    
    setError(errorMessage);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={generateData} style={{ marginBottom: '30px' }}>
        <h2>Web Data Generator Configuration</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email: *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Enter your email address"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Sandbox:
          </label>
          <input
            type="text"
            name="sandbox"
            value={formData.sandbox}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Schema ID:
          </label>
          <input
            type="text"
            name="schema_id"
            value={formData.schema_id}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Number of Users:
            </label>
            <input
              type="number"
              name="num_users"
              value={formData.num_users}
              onChange={handleInputChange}
              min="1"
              max="1000"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Number of Events:
            </label>
            <input
              type="number"
              name="num_events"
              value={formData.num_events}
              onChange={handleInputChange}
              min="1"
              max="1000"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Time Range (Days):
            </label>
            <input
              type="number"
              name="time_range_days"
              value={formData.time_range_days}
              onChange={handleInputChange}
              min="1"
              max="365"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            User Prompt:
          </label>
          <textarea
            name="user_prompt"
            value={formData.user_prompt}
            onChange={handleInputChange}
            rows="3"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Describe the type of data you want to generate"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Generating Data...' : 'Generate Web Data'}
        </button>
      </form>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div>Generating web data... Please wait.</div>
        </div>
      )}

      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '15px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {error}
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            <strong>Troubleshooting tips:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>Check if the API endpoint is accessible</li>
              <li>Verify your internet connection</li>
              <li>This might be a CORS issue - try using a CORS proxy or contact the API provider</li>
              <li>Check the browser console for more detailed error information</li>
            </ul>
          </div>
        </div>
      )}

      {response && (
        <div style={{ marginTop: '30px' }}>
          <h3>API Response:</h3>
          <div className="response-content" style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #dee2e6',
            maxHeight: '400px',
            overflow: 'auto',
            color: '#333'
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#333' }}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {responseText && (
        <div style={{ marginTop: '20px' }}>
          <h3>Raw Response Text:</h3>
          <div className="response-content" style={{
            backgroundColor: '#e9ecef',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #dee2e6',
            maxHeight: '300px',
            overflow: 'auto',
            color: '#333'
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#333' }}>
              {responseText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateWebData; 