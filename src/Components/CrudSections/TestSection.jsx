import React, { useState, useEffect } from 'react';

function TestSection() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const result = await fetch("https://backendportfolio-8r5l.onrender.com/api/test");
      const data = await result.json();
      setTestResult(data);
    } catch (error) {
      console.error(error);
      setTestResult({ error: "Failed to connect" });
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">GET /test</h2>
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
