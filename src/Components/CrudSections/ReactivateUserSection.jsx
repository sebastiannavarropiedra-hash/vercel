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
      <h2 className="section-title">PUT /usuarios/reactivar/:id</h2>
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
