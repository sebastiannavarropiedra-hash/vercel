import React, { useState } from 'react';
import { deleteLogico } from '../../services/apiService';

function DeleteLogicoSection() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!userId) return;

    if (!window.confirm('Are you sure you want to mark this user as inactive?')) return;

    setLoading(true);
    try {
      const data = await deleteLogico(userId);
      setResult(data);
      setUserId('');
    } catch (error) {
      console.error(error);
      setResult({ error: "Failed to delete user logically" });
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">DELETE /usuarios/logico/:id</h2>
      <p className="route-description">Perform a logical delete (mark as inactive)</p>
      <form onSubmit={handleDelete} className="crud-form">
        <input
          type="number"
          placeholder="Enter User ID to deactivate"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="crud-btn delete-btn"
        >
          {loading ? "Deactivating..." : "Deactivate User"}
        </button>
      </form>

      {result && (
        <pre className="result-box">{JSON.stringify(result, null, 2)}</pre>
      )}
    </section>
  );
}

export default DeleteLogicoSection;


