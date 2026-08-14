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
    fetchUsuarios().catch(() => {});
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
    "1"
  );
}

export default UsuariosDashboard;