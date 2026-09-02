import React, { useState, useEffect } from "react";
import INFO from '../Data/user';
import { useTestApi } from "./CrudSections/TestSection";
import { useGetUsuarios } from "./CrudSections/GetUsuariosSection";
import { useGetUsuarioById } from "./CrudSections/GetUsuarioByIdSection";
import { usePostUsuario } from "./CrudSections/PostUsuariosSection";
import { useUpdateUsuario } from "./CrudSections/PutUpdateSection";
import { useDeleteLogico } from "./CrudSections/DeleteLogicoSection";
import { useDeleteFisico } from "./CrudSections/DeleteFisicoSection";
import { useReactivateUsuario } from "./CrudSections/ReactivateUserSection";

function UsuariosDashboard() {
  // test API hook (kept from before)
  const { testResult, loading: loadingTest, handleTest } = useTestApi();

  // CRUD logic hooks
  const { usuarios = [], loading: loadingUsuarios, error: usuariosError, fetchUsuarios } = useGetUsuarios();
  const { usuario, loading: loadingUsuarioById, error: usuarioByIdError, fetchUsuarioById } = useGetUsuarioById();
  const { loading: loadingPostUsuario, result: postResult, error: postError, postUsuario } = usePostUsuario();
  const { loading: loadingUpdateUsuario, result: updateResult, error: updateError, updateUsuarioByData } = useUpdateUsuario();
  const { loading: loadingDeleteLogico, result: deleteLogicoResult, error: deleteLogicoError, deleteLogicoById } = useDeleteLogico();
  const { loading: loadingDeleteFisico, result: deleteFisicoResult, error: deleteFisicoError, deleteFisicoById } = useDeleteFisico();
  const { loading: loadingReactivate, result: reactivateResult, error: reactivateError, reactivateUsuarioById } = useReactivateUsuario();

  // UI state
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'inactive'
  const [query, setQuery] = useState('');

  // form state
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ Nombre_Usuario: '', Credencial_Espacial: '', ID_Perfil: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // ensure users are loaded on mount
    fetchUsuarios().catch(() => { });
  }, []);

  const openCreateForm = () => {
    setFormData({ Nombre_Usuario: '', Credencial_Espacial: '', ID_Perfil: '' });
    setEditingId(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const openEditForm = (u) => {
    setFormData({
      ID_Usuario: u.ID_Usuario,
      Nombre_Usuario: u.Nombre_Usuario || '',
      Credencial_Espacial: u.Credencial_Espacial || '',
      ID_Perfil: u.ID_Perfil || '',
    });
    setEditingId(u.ID_Usuario);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await postUsuario(formData);
      await fetchUsuarios();
      setShowForm(false);
      alert('Usuario creado');
    } catch (err) {
      console.error(err);
      alert('Error creating usuario');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      // ensure ID present
      if (!payload.ID_Usuario) {
        alert('ID required for update');
        return;
      }
      await updateUsuarioByData(payload);
      await fetchUsuarios();
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      alert('Usuario actualizado');
    } catch (err) {
      console.error(err);
      alert('Error updating usuario');
    }
  };

  const handleDeactivate = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to mark this user as inactive?')) return;
    try {
      await deleteLogicoById(id);
      await fetchUsuarios();
      alert('User deactivated');
    } catch (err) {
      console.error(err);
      alert('Failed to deactivate user');
    }
  };

  const handleReactivate = async (id) => {
    if (!id) return;
    try {
      await reactivateUsuarioById(id);
      await fetchUsuarios();
      alert('User reactivated');
    } catch (err) {
      console.error(err);
      alert('Failed to reactivate user');
    }
  };

  const filteredUsuarios = usuarios.filter(u => {
    if (!u) return false;
    const matchesQuery = query.trim() === '' || (u.Nombre_Usuario && u.Nombre_Usuario.toString().toLowerCase().includes(query.trim().toLowerCase()));
    const isActive = activeTab === 'active' ? !!u.Estado : !u.Estado;
    return matchesQuery && isActive;
  });

  return (
    <div className="usuarios-main">
      <div className="usuarios-dashboard">
        <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>Usuarios</h2>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="button" className="crud-btn" onClick={openCreateForm}>
              Crear un usuario
            </button>
            <button type="button" className="crud-btn" onClick={() => fetchUsuarios().catch(() => {})}>
              {loadingUsuarios ? 'Cargando...' : 'Actualizar'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="crud-btn"
            style={{ opacity: activeTab === 'active' ? 1 : 0.7 }}
            onClick={() => setActiveTab('active')}
          >
            Activos
          </button>
          <button
            type="button"
            className="crud-btn"
            style={{ opacity: activeTab === 'inactive' ? 1 : 0.7 }}
            onClick={() => setActiveTab('inactive')}
          >
            Inactivos
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre"
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '0.8rem 0.9rem',
              borderRadius: '8px',
              border: '1px solid #2a2a2a',
              background: '#111',
              color: 'white'
            }}
          />
        </div>

        {showForm && (
          <form className="crud-form" onSubmit={isEditing ? handleUpdate : handleCreate}>
            <input
              name="Nombre_Usuario"
              value={formData.Nombre_Usuario || ''}
              onChange={handleFormChange}
              placeholder="Nombre del usuario"
              required
            />
            <input
              name="Credencial_Espacial"
              value={formData.Credencial_Espacial || ''}
              onChange={handleFormChange}
              placeholder="Credencial espacial"
            />
            <input
              name="ID_Perfil"
              value={formData.ID_Perfil || ''}
              onChange={handleFormChange}
              placeholder="ID de perfil"
            />

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button type="submit" className="crud-btn" disabled={loadingPostUsuario || loadingUpdateUsuario}>
                {isEditing ? (loadingUpdateUsuario ? 'Guardando...' : 'Guardar cambios') : (loadingPostUsuario ? 'Creando...' : 'Crear usuario')}
              </button>
              <button
                type="button"
                className="crud-btn delete-btn danger"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                  setEditingId(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {usuariosError && <div className="error-message">{usuariosError.message || 'Error cargando usuarios'}</div>}
        {postError && <div className="error-message">{postError.message || 'Error al crear usuario'}</div>}
        {updateError && <div className="error-message">{updateError.message || 'Error al actualizar usuario'}</div>}
        {deleteLogicoError && <div className="error-message">{deleteLogicoError.message || 'Error al desactivar usuario'}</div>}
        {reactivateError && <div className="error-message">{reactivateError.message || 'Error al reactivar usuario'}</div>}

        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Credencial</th>
                <th>Perfil</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.length > 0 ? (
                filteredUsuarios.map((usuarioItem) => (
                  <tr key={usuarioItem.ID_Usuario ?? `usuario-${Math.random()}`}>
                    <td>{usuarioItem.ID_Usuario}</td>
                    <td>{usuarioItem.Nombre_Usuario || '-'}</td>
                    <td>{usuarioItem.Credencial_Espacial || '-'}</td>
                    <td>{usuarioItem.ID_Perfil ?? '-'}</td>
                    <td>{usuarioItem.Estado ? 'Activo' : 'Inactivo'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button type="button" className="crud-btn" onClick={() => openEditForm(usuarioItem)}>
                          Editar
                        </button>
                        {usuarioItem.Estado ? (
                          <button
                            type="button"
                            className="crud-btn delete-btn"
                            onClick={() => handleDeactivate(usuarioItem.ID_Usuario)}
                            disabled={loadingDeleteLogico}
                          >
                            Desactivar
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="crud-btn reactivate-btn"
                            onClick={() => handleReactivate(usuarioItem.ID_Usuario)}
                            disabled={loadingReactivate}
                          >
                            Reactivar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                    {loadingUsuarios ? 'Cargando usuarios...' : 'No se encontraron usuarios'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsuariosDashboard;