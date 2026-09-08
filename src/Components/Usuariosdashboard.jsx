import React, { useState, useEffect } from "react";
import INFO from '../Data/user';
import { useTestApi } from "./CrudSections/TestSection";
import { useGetUsuariosSection } from "./CrudSections/GetUsuariosSection";
import { useGetUsuarioByIdSection } from "./CrudSections/GetUsuarioByIdSection";
import { usePostUsuariosSection } from "./CrudSections/PostUsuariosSection";
import { usePutUpdateSection } from "./CrudSections/PutUpdateSection";
import { useDeleteLogicoSection } from "./CrudSections/DeleteLogicoSection";
import { useDeleteFisicoSection } from "./CrudSections/DeleteFisicoSection";
import { useReactivateUserSection } from "./CrudSections/ReactivateUserSection";
import '../Styles/Usuariosdashboard.css';

function UsuariosDashboard() {
    /* test api hook */
    const { testResult, loading: loadingTest, handleTest } = useTestApi();
    /* CRUD hooks */
    const { usuarios = [], setUsuarios, loading: loadingGetUsuarios, handleGetUsuarios, error: errorGetUsuarios, fetchData: fetchUsuarios } = useGetUsuariosSection();
    const { userId, setUserId, usuario = [], loading: loadingGetUsuarioById, error: errorGetUsuarioById, handleSearch } = useGetUsuarioByIdSection();
    const { result: resultPost, error: errorPost, formData: formDataPost, setFormData: setFormDataPost, handleChange: handleChangePost, handleSubmit: handleSubmitPost } = usePostUsuariosSection();
    const { formData: formDataPut, setFormData: setFormDataPut, result: resultPut, handleChange: handleChangePut, handleSubmit: handleSubmitPut } = usePutUpdateSection();
    const { userId: userIdDeleteLogico, setUserId: setUserIdDeleteLogico, handleDelete: handleDeleteLogico } = useDeleteLogicoSection();
    const { userId: userIdDeleteFisico, setUserId: setUserIdDeleteFisico, handleDelete: handleDeleteFisico } = useDeleteFisicoSection();
    const { result: resultReactivate, error: errorReactivate, handleReactivate: handleReactivateUser } = useReactivateUserSection();


    /* estado para manejar la vista actual */
    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'inactive'
    const [query, setQuery] = useState('');

    /* estado default del formulario */
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ Nombre_Usuario: '', Credencial_Espacial: '', ID_Perfil: '' });
    const [editingId, setEditingId] = useState(null);
    /* estado para manejar los usuarios seleccionados */
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const total = (usuarios || []).length;
    const active = (usuarios || []).filter((u) => u.Estado).length;
    const inactive = total - active;


    const openCreateForm = () => {
        setSelectedUsers([]);
        setFormData({ Nombre_Usuario: "", Credencial_Espacial: "", ID_Perfil: "" });
        setIsFormOpen(true);
    };
    /* OR */
    const handleUpdateClick = () => {
        if (selectedUsers.length !== 1) {
            alert("Please select exactly one user to update.");
            return;
        }

        const selectedUser = usuarios.find(
            (user) => user.ID_Usuario === selectedUsers[0]
        );

        if (selectedUser) {
            openEditForm(selectedUser);
        }
    };

    /* ↓ */
    const openEditForm = (user) => {
        setSelectedUsers([user.ID_Usuario]);
        setFormData({
            ID_Usuario: user.ID_Usuario,
            Nombre_Usuario: user.Nombre_Usuario,
            Credencial_Espacial: user.Credencial_Espacial,
            ID_Perfil: user.ID_Perfil,
        });
        setIsFormOpen(true);
    };

    /* ↓ */

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    /* ↓ */
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedUsers && selectedUsers.length > 0) {
                await handleSubmitPut(formData);
            } else {
                await handleSubmitPost(formData);
            }
            setIsFormOpen(false);
            fetchUsuarios();
            /* cerrar formulario y refrescar lista de usuarios */
        } catch (err) {
            console.error(err);
            alert("Failed to save user");
        }
    };





    const handleDeactivateClick = () => {
        if (selectedUsers.length !== 1) {
            alert("Please select exactly one user to deactivate.");
            return;
        }

        const selectedUser = usuarios.find(
            (user) => user.ID_Usuario === selectedUsers[0]
        );

        if (selectedUser) {
            handleDeleteLogico(selectedUser.ID_Usuario)
                .then(fetchUsuarios)
                .then(() => { setSelectedUsers([]); }) // Clear selection after deactivation
        }
    };

    const handleReactivateClick = () => {
        if (selectedUsers.length !== 1) {
            alert("Please select exactly one user to reactivate.");
            return;
        }

        const selectedUser = usuarios.find(
            (user) => user.ID_Usuario === selectedUsers[0]
        );

        if (selectedUser) {
            handleReactivateUser(selectedUser.ID_Usuario).then(fetchUsuarios).then(() => { setSelectedUsers([]); }) // Clear selection after reactivation
        }
    };

    const handleDeleteClick = () => {
        if (selectedUsers.length !== 1) {
            alert("Please select exactly one user to delete.");
            return;
        }

        const selectedUser = usuarios.find(
            (user) => user.ID_Usuario === selectedUsers[0]
        );

        if (selectedUser) {
            handleDeleteFisico(selectedUser.ID_Usuario).then(fetchUsuarios).then(() => { setSelectedUsers([]); }); // Clear selection after deletion
        }
    };

    // useEffect(callback, dependencyArray) -> runs the callback after render, and again whenever a value in dependencyArray changes.
    // () => { ... }                         -> arrow function passed as the effect callback (the code React will execute).
    // fetchUsuarios()                       -> calls fetchUsuarios, expected to return a Promise (fetches the users list).
    // .catch(() => { })                     -> if that Promise rejects, swallow the error silently (empty handler, no-op).
    // []                                    -> dependency array is empty, so this effect runs only once, on mount (like componentDidMount).

    useEffect(() => { fetchUsuarios().catch(() => { }); }, []);

    useEffect(() => {
        // Check immediately when the component mounts
        handleTest();

        // Then check every 1 minute
        const interval = setInterval(() => {
            handleTest();
        }, 60 * 1000);

        // Clean up when the component unmounts
        return () => clearInterval(interval);
    }, [handleTest]);

    useEffect(() => {
        if (usuario) {
            setUsuarios([usuario]);
        }
    }, [usuario]);

    console.log(
    usuarios.map((u) => ({
        id: u.ID_Usuario,
        estado: u.Estado
    }))
);


    return (

        <div className="usuarios-main">
            <div>
                {loadingTest ? (
                    <span>Checking status...</span>
                ) : testResult ? (
                    <span>Base is online <i className="fa-solid fa-circle-dot"></i></span>
                ) : (
                    <span>Base is offline <i className="fa-solid fa-spinner"></i></span>
                )}
            </div>
            <div className="usuarios-dashboard">
                <div className="dashboard-header">
                    <header className="navbar navbar-dark sticky-top bg-dark flex-nowrap shadow">

                        <a className="navbar-brand">
                            CRUD Users
                        </a>

                        <form
                            onSubmit={handleSearch}
                            className="d-flex w-100 mx-3"
                        >
                            <input
                                className="form-control form-control-dark"
                                type="number"
                                placeholder="Enter User ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                                aria-label="Search user by ID"
                            />

                            <button
                                type="submit"
                                disabled={loadingGetUsuarioById}
                                className="btn btn-outline-light ms-2"
                            >
                                {loadingGetUsuarioById ? "Searching..." : "Search"}
                            </button>

                        </form>

                        <div className="navbar-nav">
                            <div className="nav-item text-nowrap">
                                <a className="nav-link px-3">
                                    Sign out
                                </a>
                            </div>
                        </div>

                        <button
                            className="navbar-toggler d-md-none collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </header>
                </div>

                <div className="dashboard-content row m-0 ">
                    {/* Modal for creating/editing user */}
                    {isFormOpen && (
                        <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">

                                    {/* Header */}
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {selectedUsers && selectedUsers.length > 0
                                                ? "Editar Usuario"
                                                : "Crear Usuario"}
                                        </h5>

                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setIsFormOpen(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>

                                    {/* Body */}
                                    <div className="modal-body">
                                        <form onSubmit={handleFormSubmit}>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="Nombre_Usuario"
                                                    className="form-label"
                                                >
                                                    Nombre Usuario
                                                </label>

                                                <input
                                                    id="Nombre_Usuario"
                                                    name="Nombre_Usuario"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nombre Usuario"
                                                    value={formData.Nombre_Usuario || ""}
                                                    onChange={handleFormChange}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="Credencial_Espacial"
                                                    className="form-label"
                                                >
                                                    Credencial Espacial
                                                </label>

                                                <input
                                                    id="Credencial_Espacial"
                                                    name="Credencial_Espacial"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Credencial Espacial"
                                                    value={formData.Credencial_Espacial || ""}
                                                    onChange={handleFormChange}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="ID_Perfil"
                                                    className="form-label"
                                                >
                                                    ID Perfil
                                                </label>

                                                <input
                                                    id="ID_Perfil"
                                                    name="ID_Perfil"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="ID Perfil"
                                                    value={formData.ID_Perfil || ""}
                                                    onChange={handleFormChange}
                                                    required
                                                />
                                            </div>

                                            {/* Footer */}
                                            <div className="modal-footer px-0 pb-0">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => setIsFormOpen(false)}
                                                >
                                                    Cancelar
                                                </button>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    {selectedUsers && selectedUsers.length > 0
                                                        ? "Guardar"
                                                        : "Crear"}
                                                </button>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}




                    {/* Sidebar */}
                    <div className="dashboard-sidebar col-lg-2 col-md-2 p-0 collapse d-md-block " id="sidebarMenu">
                        <div className="d-flex flex-column   bg-dark h-100 " >


                            <ul className="nav nav-pills flex-column align-items-center  ">
                                <li>
                                    <button className="nav-link text-white" onClick={openCreateForm}>
                                        Create <i className="fa-solid fa-plus"></i>
                                    </button>
                                </li>

                                <li>
                                    <button className="nav-link text-white" onClick={handleUpdateClick}>
                                        Update <i className="fa-solid fa-pen"></i>
                                    </button>
                                </li>

                                <li>
                                    <button className="nav-link text-white" onClick={handleDeactivateClick}>
                                        Deactivate <i className="fa-solid fa-ban"></i>
                                    </button>
                                </li>

                                <li>
                                    <button className="nav-link text-white" onClick={handleReactivateClick}>
                                        Reactivate <i className="fa-solid fa-rotate-right"></i>
                                    </button>
                                </li>

                                <li>
                                    <button className="nav-link text-white" onClick={handleDeleteClick}>
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </li>


                            </ul>


                        </div>
                    </div>


                    {/* Main content */}
                    <div className="dashboard-table col p-0 bg-dark">

                        <button onClick={fetchUsuarios} disabled={loadingGetUsuarios} className="crud-btn">
                            {loadingGetUsuarios ? "Loading..." : "Refresh Users"}
                        </button>
                        <div className="stats-row">
                            <div className="stat-card">Total: {total}</div>
                            <div className="stat-card">Activos: {active}</div>
                            <div className="stat-card">Inactivos: {inactive}</div>
                        </div>

                        {errorGetUsuarios && <p className="error-message">{errorGetUsuarios}</p>}

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
                                    <tbody className="users-table-body">
                                        {usuarios.map((usuario) => (
                                            <tr key={usuario.ID_Usuario}>
                                                {/* Select checkbox */}
                                                <td>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(usuario.ID_Usuario)}
                                                        onChange={() => {
                                                            setSelectedUsers((current) =>
                                                                current.includes(usuario.ID_Usuario)
                                                                    ? current.filter((id) => id !== usuario.ID_Usuario)
                                                                    : [...current, usuario.ID_Usuario]
                                                            );
                                                        }}
                                                        aria-label={`Select user ${usuario.ID_Usuario}`}
                                                    /> {usuario.ID_Usuario}
                                                </td>
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
                    </div>
                </div>


            </div>
        </div >
    );
}

export default UsuariosDashboard;
