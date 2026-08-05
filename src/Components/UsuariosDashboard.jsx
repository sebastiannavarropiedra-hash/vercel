import React, { useState } from "react";
import "../Styles/UsuariosDashboard.css";

// Props-driven dashboard: expects callers to provide the data and action handlers so
// multiple components can share a single source of truth (live list).
function UsuariosDashboard({
  usuarios = [],
  loading = false,
  error = null,
  fetchUsuarios = () => {},
  onCreate = async () => {},
  onUpdate = async () => {},
  onSoftDelete = async () => {},
  onHardDelete = async () => {},
  onReactivate = async () => {},
}) {
  // UI state
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // for edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    Nombre_Usuario: "",
    Credencial_Espacial: "",
    ID_Perfil: "",
  });

  // Pagination (simple)
  const [page, setPage] = useState(1);
  const perPage = 10;

  const openCreateForm = () => {
    setSelectedUser(null);
    setFormData({ Nombre_Usuario: "", Credencial_Espacial: "", ID_Perfil: "" });
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setSelectedUser(user);
    setFormData({
      ID_Usuario: user.ID_Usuario,
      Nombre_Usuario: user.Nombre_Usuario,
      Credencial_Espacial: user.Credencial_Espacial,
      ID_Perfil: user.ID_Perfil,
    });
    setIsFormOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await onUpdate(formData);
      } else {
        await onCreate(formData);
      }
      setIsFormOpen(false);
      fetchUsuarios();
    } catch (err) {
      console.error(err);
      // delegate error handling to parent; show simple alert for now
      alert("Failed to save user");
    }
  };

  const confirmAndSoftDelete = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this usuario?")) return;
    await onSoftDelete(id);
    fetchUsuarios();
  };

  const confirmAndHardDelete = async (id) => {
    if (!window.confirm("This permanently deletes the usuario. Continue?")) return;
    await onHardDelete(id);
    fetchUsuarios();
  };

  const handleReact = async (id) => {
    await onReactivate(id);
    fetchUsuarios();
  };

  // Filters + pagination
  const filtered = (usuarios || []).filter((u) =>
    `${u.Nombre_Usuario} ${u.Credencial_Espacial}`.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  // Stats
  const total = (usuarios || []).length;
  const active = (usuarios || []).filter((u) => u.Estado).length;
  const inactive = total - active;

  return (
    <div className="usuarios-dashboard">
      <div className="dashboard-header">
        <h2>Usuarios Intergalácticos</h2>
        <div className="controls">
          <input
            className="search-input"
            placeholder="Buscar usuarios..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <button className="btn primary" onClick={openCreateForm}>
            Crear Usuario
          </button>
          <button className="btn" onClick={fetchUsuarios} disabled={loading}>
            {loading ? "Cargando..." : "Refrescar"}
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">Total: {total}</div>
        <div className="stat-card">Activos: {active}</div>
        <div className="stat-card">Inactivos: {inactive}</div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Perfil</th>
              <th>Credencial</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u) => (
              <tr key={u.ID_Usuario}>
                <td>{u.ID_Usuario}</td>
                <td>{u.Nombre_Usuario}</td>
                <td>{u.ID_Perfil}</td>
                <td>{u.Credencial_Espacial}</td>
                <td>{u.Estado ? "Activo" : "Inactivo"}</td>
                <td className="actions-cell">
                  <button className="btn small" onClick={() => openEditForm(u)}>
                    Editar
                  </button>
                  {u.Estado ? (
                    <button className="btn small" onClick={() => confirmAndSoftDelete(u.ID_Usuario)}>
                      Desactivar
                    </button>
                  ) : (
                    <button className="btn small" onClick={() => handleReact(u.ID_Usuario)}>
                      Reactivar
                    </button>
                  )}
                  <button className="btn small danger" onClick={() => confirmAndHardDelete(u.ID_Usuario)}>
                    Borrar Permanente
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan="6">No se encontraron usuarios</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          ←
        </button>
        <span className="page-indicator">
          {page} / {totalPages}
        </span>
        <button className="btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          →
        </button>
      </div>

      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedUser ? "Editar Usuario" : "Crear Usuario"}</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                name="Nombre_Usuario"
                placeholder="Nombre Usuario"
                value={formData.Nombre_Usuario || ""}
                onChange={handleFormChange}
                required
              />
              <input
                name="Credencial_Espacial"
                placeholder="Credencial Espacial"
                value={formData.Credencial_Espacial || ""}
                onChange={handleFormChange}
                required
              />
              <input
                name="ID_Perfil"
                placeholder="ID Perfil"
                type="number"
                value={formData.ID_Perfil || ""}
                onChange={handleFormChange}
                required
              />
              <div className="modal-actions">
                <button className="btn primary" type="submit">{selectedUser ? "Guardar" : "Crear"}</button>
                <button className="btn" type="button" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuariosDashboard;
