/**
 * ReactivateUserSection Component
 * 
 * Reactivates a deactivated/inactive user.
 * Requires user confirmation before reactivating.
 * Only works on users with Estado = false (inactive users).
 * Sets Estado back to true.
 * 
 * State:
 * - userId: The ID of the user to reactivate
 * - loading: Boolean tracking reactivation status
 * - result: Response from the API
 * 
 * Functions:
 * - handleReactivate: Confirms action and sends reactivation request
 * 
 * Note: This is the counterpart to DeleteLogicoSection
 * Logical delete deactivates, this reactivates
 */

import React, { useState } from 'react';
import { reactivarUsuario } from '../../services/apiService';

export function useReactivateUsuario() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const reactivateUsuarioById = async (id) => {
    if (!id) throw new Error('id is required');
    setLoading(true);
    setError(null);
    try {
      const data = await reactivarUsuario(id);
      setResult(data);
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to reactivate user');
      setResult({ error: 'Failed to reactivate user' });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, reactivateUsuarioById };
}
export default function ReactivateUserSection() {
  return null;
}
