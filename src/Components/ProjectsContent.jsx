import React from 'react';
import '../Styles/ProjectsContent.css';
import INFO from '../Data/user';
import TestSection from './CrudSections/TestSection';
import GetUsuariosSection from './CrudSections/GetUsuariosSection';
import PostUsuariosSection from './CrudSections/PostUsuariosSection';
import GetUsuarioByIdSection from './CrudSections/GetUsuarioByIdSection';
import PutUpdateSection from './CrudSections/PutUpdateSection';
import DeleteLogicoSection from './CrudSections/DeleteLogicoSection';
import DeleteFisicoSection from './CrudSections/DeleteFisicoSection';
import ReactivateUserSection from './CrudSections/ReactivateUserSection';
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
