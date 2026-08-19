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

/**
 * Hook: useTestApi
 * Provides the logic for testing the backend /test endpoint.
 * - testResult: response or error object
 * - loading: boolean in-flight state
 * - handleTest: async function to invoke the API
 */
export function useTestApi() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const data = await testApi();
      setTestResult(data);
      return data;
    } catch (error) {
      console.error(error);
      const errObj = { error: 'Failed to connect', details: error?.message };
      setTestResult(errObj);
      throw errObj;
    } finally {
      setLoading(false);
    }
  };

  return { testResult, loading, handleTest };
}

/**
 * Default export kept as a minimal component that renders null.
 * This preserves existing imports that expect a component while
 * avoiding UI concerns — the logic should be consumed via useTestApi.
 */
export default function TestSection() {
  return null;
}
