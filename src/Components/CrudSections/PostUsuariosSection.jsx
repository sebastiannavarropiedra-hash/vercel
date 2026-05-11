/**
 * PostUsuariosSection Component
 * 
 * Form to create a new user in the database.
 * Accepts: Nombre_Usuario, Credencial_Espacial, ID_Perfil
 * Clears form after successful creation.
 * Displays API response (success or error).
 * 
 * State:
 * - formData: Object containing user input (Nombre, Credencial, Perfil)
 * - loading: Boolean tracking form submission status
 * - result: Response from the API after submission
 * 
 * Functions:
 * - handleChange: Updates formData when user types in inputs
 * - handleSubmit: Validates and sends user data to backend
 */

import React, { useState } from 'react';
import { crearUsuario } from '../../services/apiService';

function PostUsuariosSection() {
  const [formData, setFormData] = useState({
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
      const data = await crearUsuario(formData);
      setResult(data);
      setFormData({
        Nombre_Usuario: '',
        Credencial_Espacial: '',
        ID_Perfil: '',
      });
    } catch (error) {
      console.error(error);
      setResult({ error: "Failed to create user" });
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">-POST /usuarios-</h2>
      <p className="route-description">Create a new user(users will be generated an user ID automatically)</p>
      <form onSubmit={handleSubmit} className="crud-form">
        <input
          type="text"
          name="Nombre_Usuario"
          placeholder="Nombre Usuario"
          value={formData.Nombre_Usuario}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Credencial_Espacial"
          placeholder="Credencial Espacial(Job title)"
          value={formData.Credencial_Espacial}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="ID_Perfil"
          placeholder="ID Perfil(1 to 3)"
          value={formData.ID_Perfil}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading} className="crud-btn">
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
      
      {result && (
        <pre className="result-box">{JSON.stringify(result, null, 2)}</pre>
      )}
    </section>
  );
}

export default PostUsuariosSection;
