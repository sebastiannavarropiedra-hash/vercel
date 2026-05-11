import React, { useState } from 'react';
import { getUsuarioById } from '../../services/apiService';

function GetUsuarioByIdSection() {
  const [userId, setUserId] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getUsuarioById(userId);
      const usuarioEncontrado = Array.isArray(data.datos) ? data.datos[0] : data.datos || data;
      setUsuario(usuarioEncontrado || null);
      if (!usuarioEncontrado) {
        setError('Usuario no encontrado');
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user");
      setUsuario(null);
    }
    setLoading(false);
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">GET /usuarios/:id</h2>
      <p className="route-description">Retrieve a single user by ID</p>
      <form onSubmit={handleSearch} className="crud-form">
        <input
          type="number"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="crud-btn">
          {loading ? "Searching..." : "Search User"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {usuario && (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Perfil</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usuario.ID_Usuario}</td>
                <td>{usuario.Nombre_Usuario}</td>
                <td>{usuario.ID_Perfil}</td>
                <td>{usuario.Estado ? "Activo" : "Inactivo"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default GetUsuarioByIdSection;
