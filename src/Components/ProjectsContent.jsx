import React from 'react';
import { useState, useEffect } from "react";
import '../Styles/ProjectsContent.css';

function ProjectsContent() {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch(
                "https://backendportfolio-8r5l.onrender.com/api/usuarios"
            );
            const data = await response.json();
            setUsuarios(data.datos);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Backend API Dashboard</h1>

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
                        {usuarios.map((usuario) => (
                            <tr key={usuario.ID_Usuario}>
                                <td>{usuario.ID_Usuario}</td>
                                <td>{usuario.Nombre_Usuario}</td>
                                <td>{usuario.ID_Perfil}</td>
                                <td>{usuario.Estado ? "Activo" : "Inactivo"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProjectsContent;
