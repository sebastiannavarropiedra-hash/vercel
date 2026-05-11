import React, { useState } from 'react';
import { deleteFisico } from '../../services/apiService';

function DeleteFisicoSection() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!userId) return;

    if (!window.confirm('WARNING: This will permanently delete the user from the database. Are you absolutely sure?')) {
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
      <h2 className="section-title">DELETE /usuarios/fisico/:id</h2>
      <p className="route-description">Perform a physical delete (permanent removal)</p>
      <form onSubmit={handleDelete} className="crud-form">
        <input
          type="number"
          placeholder="Enter User ID to permanently delete"
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
