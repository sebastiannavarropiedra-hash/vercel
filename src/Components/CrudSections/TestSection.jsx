/**
 * TestSection Component
 * 
 * Tests the API connection by calling the /test endpoint.
 * Useful for debugging and verifying the backend is accessible.
 * 
 * State:
 * - testResult: Stores the response from the test API call
 * - loading: Boolean to track if request is in progress
 * 
 * Functions:
 * - handleTest: Makes the test API call and displays the result
 */

import React, { useState } from 'react';
import { testApi } from '../../services/apiService';

function TestSection() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const data = await testApi();
      setTestResult(data);
    } catch (error) {
      console.error(error);
      setTestResult({ error: "Failed to connect" });
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">-GET /test-</h2>
      <p className="route-description">Test endpoint to verify API connection</p>
      <button onClick={handleTest} disabled={loading} className="crud-btn">
        {loading ? "Testing..." : "Test Connection"}
      </button>
      {testResult && (
        <pre className="result-box">{JSON.stringify(testResult, null, 2)}</pre>
      )}
    </section>
  );
}

export default TestSection;
