/**
 * DeleteFisicoSection Component
 * 
 * Performs a PHYSICAL DELETE (hard delete) on a user.
 * Permanently removes the user from the database.
 * This action CANNOT be undone - use with caution!
 * 
 * State:
 * - userId: The ID of the user to permanently delete
 * - loading: Boolean tracking deletion status
 * - result: Response from the API
 * 
 * Functions:
 * - handleDelete: Confirms action (twice!) and sends permanent delete request
 * 
 * Safety Features:
 * - Double confirmation dialog with explicit warning
 * - "danger" button styling to visually indicate permanent action
 * - This prevents accidental data loss
 * 
 * Contrast with DeleteLogicoSection:
 * - Fisico: Permanent, data deleted, cannot be recovered
 * - Logico: Reversible, data preserved, can be reactivated
 */

import React, { useState } from 'react';
import { deleteFisico } from '../../services/apiService';

function DeleteFisicoSection() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!userId) return;

    if (!window.confirm('WARNING: This will permanently delete the user from the database. you could lose your job')) {
      return;
    }

    setLoading(true);
    try {
      const data = await deleteFisico(userId);
      setResult(data);
      setUserId('');
    } catch (error) {
      console.error(error);
      setResult({ error: "Failed to delete user permanently" });
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">-DELETE /usuarios/fisico/:id-</h2>
      <p className="route-description">Perform a physical delete (permanent removal)</p>
      <form onSubmit={handleDelete} className="crud-form">
        <input
          type="number"
          placeholder="Enter User ID to permanently delete forever and ever"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="crud-btn delete-btn danger"
        >
          {loading ? "Deleting..." : "Permanently Delete User"}
        </button>
      </form>

      {result && (
        <pre className="result-box">{JSON.stringify(result, null, 2)}</pre>
      )}
    </section>
  );
}

export default DeleteFisicoSection;
