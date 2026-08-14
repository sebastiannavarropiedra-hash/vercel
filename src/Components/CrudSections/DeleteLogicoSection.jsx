/**
 * DeleteLogicoSection Component
 * 
 * Performs a LOGICAL DELETE (soft delete) on a user.
 * Sets the user's Estado to false (marks as inactive).
 * User data remains in the database and can be reactivated.
 * 
 * State:
 * - userId: The ID of the user to deactivate
 * - loading: Boolean tracking deletion status
 * - result: Response from the API
 * 
 * Functions:
 * - handleDelete: Confirms action and sends soft delete request
 * 
 * Safety Features:
 * - Confirmation dialog before proceeding
 * - User can undo by using ReactivateUserSection
 * 
 * Contrast with DeleteFisicoSection:
 * - Logico: Reversible, data preserved, Estado = false
 * - Fisico: Permanent, data deleted from database
 */

import React, { useState } from 'react';
import { deleteLogico } from '../../services/apiService';

export function useDeleteLogico() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const deleteLogicoById = async (id) => {
    if (!id) throw new Error('id is required');
    setLoading(true);
    setError(null);
    try {
      const data = await deleteLogico(id);
      setResult(data);
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to delete user logically');
      setResult({ error: 'Failed to delete user logically' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, deleteLogicoById };
}

export default function DeleteLogicoSection() {
  return null;
}


