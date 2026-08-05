import React, { useState, useEffect } from 'react';
import '../Styles/ProjectsContent.css';
import INFO from '../Data/user';
import UsuariosDashboard from './UsuariosDashboard';
import TestSection from './CrudSections/TestSection';
import GetUsuariosSection from './CrudSections/GetUsuariosSection';
import PostUsuariosSection from './CrudSections/PostUsuariosSection';
import GetUsuarioByIdSection from './CrudSections/GetUsuarioByIdSection';
import PutUpdateSection from './CrudSections/PutUpdateSection';
import DeleteLogicoSection from './CrudSections/DeleteLogicoSection';
import DeleteFisicoSection from './CrudSections/DeleteFisicoSection';
import ReactivateUserSection from './CrudSections/ReactivateUserSection';
import {
  getUsuarios,
  crearUsuario,
  updateUsuario,
  deleteLogico,
  deleteFisico,
  reactivarUsuario,
} from '../services/apiService';

function ProjectsContent() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await getUsuarios();
      setUsuarios(res.datos || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreate = async (userData) => {
    setLoading(true);
    try {
      await crearUsuario(userData);
      await fetchUsuarios();
    } catch (err) {
      console.error(err);
      setError('Failed to create usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (userData) => {
    setLoading(true);
    try {
      await updateUsuario(userData);
      await fetchUsuarios();
    } catch (err) {
      console.error(err);
      setError('Failed to update usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id) => {
    setLoading(true);
    try {
      await deleteLogico(id);
      await fetchUsuarios();
    } catch (err) {
      console.error(err);
      setError('Failed to deactivate usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleHardDelete = async (id) => {
    setLoading(true);
    try {
      await deleteFisico(id);
      await fetchUsuarios();
    } catch (err) {
      console.error(err);
      setError('Failed to delete usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleReactivate = async (id) => {
    setLoading(true);
    try {
      await reactivarUsuario(id);
      await fetchUsuarios();
    } catch (err) {
      console.error(err);
      setError('Failed to reactivate usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">{INFO.projects[0].title}</h1>

      <div className="crud-sections-container">
        <UsuariosDashboard
          usuarios={usuarios}
          loading={loading}
          error={error}
          fetchUsuarios={fetchUsuarios}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onSoftDelete={handleSoftDelete}
          onHardDelete={handleHardDelete}
          onReactivate={handleReactivate}
        />

        <TestSection />
        <GetUsuariosSection usuarios={usuarios} />
        <PostUsuariosSection onCreated={handleCreate} />
        <GetUsuarioByIdSection />
        <PutUpdateSection />
        <ReactivateUserSection />
        <DeleteLogicoSection />
        <DeleteFisicoSection />
      </div>
    </div>
  );
}

export default ProjectsContent;
