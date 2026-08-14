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

export function usePostUsuario() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const postUsuario = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await crearUsuario(formData);
      setResult(data);
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create user');
      setResult({ error: 'Failed to create user' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, postUsuario };
}

export default function PostUsuariosSection() {
  return null;
}
