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

function GetUsuariosSection() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsuarios(data.datos || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">-GET /usuarios-</h2>
      <p className="route-description">Retrieve all active users</p>
      <button onClick={fetchData} disabled={loading} className="crud-btn">
        {loading ? "Loading..." : "Refresh Users"}
      </button>
      
      {error && <p className="error-message">{error}</p>}
      
      {usuarios.length > 0 && (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID usuario</th>
                <th>Nombre</th>
                <th>ID Perfil</th>
                <th>Credencial</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.ID_Usuario}>
                  <td>{usuario.ID_Usuario}</td>
                  <td>{usuario.Nombre_Usuario}</td>
                  <td>{usuario.ID_Perfil}</td>
                  <td>{usuario.Credencial_Espacial}</td>
                  <td>{usuario.Estado ? "Activo" : "Inactivo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default GetUsuariosSection;
