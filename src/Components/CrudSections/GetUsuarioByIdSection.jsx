/**
 * GetUsuarioByIdSection Component
 * 
 * Search for a specific user by ID and display their details in a table.
 * Requires user input (ID) before fetching.
 * Shows error if user not found.
 * 
 * State:
 * - userId: The ID entered by the user
 * - usuario: Single user object returned from search
 * - loading: Boolean tracking search status
 * - error: Error message if search fails or user not found
 * 
 * Functions:
 * - handleSearch: Fetches user data by ID and handles responses
 * 
 * Note: The API response returns dados as an array, we extract [0]
 */

import React, { useState } from 'react';
import { getUsuarioById } from '../../services/apiService';

export function useGetUsuarioById() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarioById = async (id) => {
    if (!id) throw new Error('id is required');
    setLoading(true);
    setError(null);
    try {
      const data = await getUsuarioById(id);
      const usuarioEncontrado = Array.isArray(data.datos) ? data.datos[0] : data.datos || data;
      setUsuario(usuarioEncontrado || null);
      if (!usuarioEncontrado) {
        const err = new Error('Usuario no encontrado');
        setError(err.message);
        throw err;
      }
      return usuarioEncontrado;
    } catch (err) {
      console.error(err);
      setUsuario(null);
      setError(err.message || 'Failed to fetch user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { usuario, loading, error, fetchUsuarioById };
}

export default function GetUsuarioByIdSection() {
  return null;
}
