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
    const { usuarios = [], loading: loadingGetUsuarios, handleGetUsuarios, error: errorGetUsuarios, fetchData: fetchUsuarios } = useGetUsuariosSection();
    const { userId, setUserId, usuario, loading: loadingGetUsuarioById, error: errorGetUsuarioById, handleSearch } = useGetUsuarioByIdSection();
    const { result: resultPost, error: errorPost, formData: formDataPost, setFormData: setFormDataPost, handleChange: handleChangePost } = usePostUsuariosSection();
    const { formData: formDataPut, setFormData: setFormDataPut, result: resultPut, handleChange: handleChangePut } = usePutUpdateSection();
    const { userId: userIdDeleteLogico, setUserId: setUserIdDeleteLogico } = useDeleteLogicoSection();
    const { userId: userIdDeleteFisico, setUserId: setUserIdDeleteFisico } = useDeleteFisicoSection();
    const { result: resultReactivate, error: errorReactivate } = useReactivateUserSection();


    /* estado para manejar la vista actual */
    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'inactive'
    const [query, setQuery] = useState('');

    /* estado default del formulario */
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ Nombre_Usuario: '', Credencial_Espacial: '', ID_Perfil: '' });
    const [editingId, setEditingId] = useState(null);



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

    return (

        <div className="usuarios-main">
            <div>
                {loadingTest ? (
                    <span>Checking status...</span>
                ) : testResult ? (
                    <span>Base is online</span>
                ) : (
                    <span>Base is offline</span>
                )}
            </div>
            <div className="usuarios-dashboard">
                <div className="dashboard-header">
                    <header className="navbar navbar-dark sticky-top bg-dark flex-nowrap shadow">
                        <a className="navbar-brand" >CRUD Users</a>

                        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                        <div className="navbar-nav">
                            <div className="nav-item text-nowrap">
                                <a className="nav-link px-3" >Sign out</a>
                            </div>
                        </div>
                        <button className="navbar-toggler  d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </header>
                </div>

                <div className="dashboard-content row m-0 ">

                    {/* Sidebar */}
                    <div className="dashboard-sidebar col-lg-2  p-0 collapse d-md-block " id="sidebarMenu">
                        <div className="d-flex flex-column   bg-dark h-100 " >


                            <ul className="nav nav-pills flex-column  ">
                                <li className="nav-item">
                                    <a className="nav-link-color active" aria-current="page">
                                        Create
                                    </a>
                                </li>
                                <li><a className="nav-link text-white">Update</a>
                                </li>
                                <li><a className="nav-link text-white">Delete</a>
                                </li>
                                <li><a className="nav-link text-white">Reactivate</a>
                                </li>

                            </ul>


                        </div>
                    </div>


                    {/* Main content */}
                    <div className="dashboard-table col p-0 bg-dark">

                        <button onClick={fetchUsuarios} disabled={loadingGetUsuarios} className="crud-btn">
                            {loadingGetUsuarios ? "Loading..." : "Refresh Users"}
                        </button>

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
                    </div>
                </div>


            </div>
        </div >
    );
}

export default UsuariosDashboard;
