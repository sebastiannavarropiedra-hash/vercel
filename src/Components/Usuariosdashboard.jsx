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
    const { usuarios = [], loading: loadingGetUsuarios, handleGetUsuarios, fetchData: fetchUsuarios } = useGetUsuariosSection();
    const { error: errorGetById } = useGetUsuarioByIdSection();
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



    return (

        <div className="usuarios-main">
            <div className="usuarios-dashboard">
                <div className="dashboard-header">
                    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap  shadow">
                        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">CRUD Users</a>
                        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"></input>
                        <div className="navbar-nav">
                            <div className="nav-item text-nowrap">
                                <a className="nav-link px-3" href="#">Sign out</a>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="dashboard-sidebar row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">

                                        Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">

                                        Orders
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">

                                        Products
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">

                                        Customers
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">

                                        Reports
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">

                                        Integrations
                                    </a>
                                </li>
                            </ul>


                        </div>
                    </nav>

                    <div className="Dashboard-table col-md-9 ms-sm-auto col-lg-10 px-md-4">

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>

    );

}


export default UsuariosDashboard;