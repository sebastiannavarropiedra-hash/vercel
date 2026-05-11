/**
 * PutUpdateSection Component
 * 
 * Form to update an existing user's information.
 * All fields are optional (updates only provided fields).
 * ID_Usuario is required to identify which user to update.
 * Displays API response after submission.
 * 
 * State:
 * - formData: Object containing user data to update
 *   - ID_Usuario: Required - identifies which user to update
 *   - Nombre_Usuario: Optional - new user name
 *   - Credencial_Espacial: Optional - new credential
 *   - ID_Perfil: Optional - new profile ID
 * - loading: Boolean tracking submission status
 * - result: Response from the API
 * 
 * Functions:
 * - handleChange: Updates formData as user types
 * - handleSubmit: Sends update request to backend
 */

import React, { useState } from 'react';
import { updateUsuario } from '../../services/apiService';

function PutUpdateSection() {
  const [formData, setFormData] = useState({
    ID_Usuario: '',
    Nombre_Usuario: '',
    Credencial_Espacial: '',
    ID_Perfil: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await updateUsuario(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Failed to update user" });
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">PUT /update</h2>
      <p className="route-description">Update an existing user</p>
      <form onSubmit={handleSubmit} className="crud-form">
        <input
          type="number"
          name="ID_Usuario"
          placeholder="ID Usuario"
          value={formData.ID_Usuario}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Nombre_Usuario"
          placeholder="Nombre Usuario"
          value={formData.Nombre_Usuario}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Credencial_Espacial"
          placeholder="Credencial Espacial"
          value={formData.Credencial_Espacial}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ID_Perfil"
          placeholder="ID Perfil"
          value={formData.ID_Perfil}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading} className="crud-btn">
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>

      {result && (
        <pre className="result-box">{JSON.stringify(result, null, 2)}</pre>
      )}
    </section>
  );
}

export default PutUpdateSection;
