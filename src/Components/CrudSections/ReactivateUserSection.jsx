/**
 * ReactivateUserSection Component
 * 
 * Reactivates a deactivated/inactive user.
 * Requires user confirmation before reactivating.
 * Only works on users with Estado = false (inactive users).
 * Sets Estado back to true.
 * 
 * State:
 * - userId: The ID of the user to reactivate
 * - loading: Boolean tracking reactivation status
 * - result: Response from the API
 * 
 * Functions:
 * - handleReactivate: Confirms action and sends reactivation request
 * 
 * Note: This is the counterpart to DeleteLogicoSection
 * Logical delete deactivates, this reactivates
 */

import React, { useState } from 'react';
import { reactivarUsuario } from '../../services/apiService';

function ReactivateUserSection() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleReactivate = async (e) => {
    e.preventDefault();
    if (!userId) return;

    if (!window.confirm('Are you sure you want to reactivate this user?')) return;

    setLoading(true);
    try {
      const data = await reactivarUsuario(userId);
      setResult(data);
      setUserId('');
    } catch (error) {
      console.error(error);
      setResult({ error: "Failed to reactivate user" });
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">-PUT /usuarios/reactivar/:id-</h2>
      <p className="route-description">Reactivate an inactive user</p>
      <form onSubmit={handleReactivate} className="crud-form">
        <input
          type="number"
          placeholder="Enter User ID to reactivate"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="crud-btn reactivate-btn"
        >
          {loading ? "Reactivating..." : "Reactivate User"}
        </button>
      </form>

      {result && (
        <pre className="result-box">{JSON.stringify(result, null, 2)}</pre>
      )}
    </section>
  );
}

export default ReactivateUserSection;
