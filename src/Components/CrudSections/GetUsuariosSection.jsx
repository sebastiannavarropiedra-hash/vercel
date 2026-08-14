/**
 * GetUsuariosSection Component
 * 
 * Displays all users from the database in a table format.
 * Automatically fetches data when component mounts.
 * Provides a refresh button to reload user data.
 * 
 * State:
 * - usuarios: Array of all users fetched from the database
 * - loading: Boolean indicating if data is being fetched
 * - error: Error message if fetch fails
 * 
 * Lifecycle:
 * - useEffect on mount: Automatically fetches all users
 */

import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../../services/apiService';
import '../../Styles/GetUsuariosSection.css';

export function useGetUsuarios(autoFetch = true) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsuarios(data.datos || []);
      setError(null);
      return data;
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchUsuarios();
  }, [autoFetch]);

  return { usuarios, loading, error, fetchUsuarios };
}

export default function GetUsuariosSection() {
  return null;
}

