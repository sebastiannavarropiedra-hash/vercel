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

export function useDeleteFisico() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const deleteFisicoById = async (id) => {
    if (!id) throw new Error('id is required');
    setLoading(true);
    setError(null);
    try {
      const data = await deleteFisico(id);
      setResult(data);
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to delete user permanently');
      setResult({ error: 'Failed to delete user permanently' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, deleteFisicoById };
}

export default function DeleteFisicoSection() {
  return null;
}
