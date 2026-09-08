import React from 'react';
import '../Styles/ProjectsContent.css';
import INFO from '../Data/user';

import UsuariosDashboard from './Usuariosdashboard';

function ProjectsContent() {

    return (
        <div className="dashboard-container container-fluid">
            <h1 className="dashboard-title">{INFO.projects[0].title}</h1>
        
            <div className="crud-sections-container">
                <UsuariosDashboard/>
            </div>
        </div>
    );
}

export default ProjectsContent;
