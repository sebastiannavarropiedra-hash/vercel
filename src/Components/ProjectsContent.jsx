import React from 'react';
import '../Styles/ProjectsContent.css';
import TestSection from './CrudSections/TestSection';
import GetUsuariosSection from './CrudSections/GetUsuariosSection';
import PostUsuariosSection from './CrudSections/PostUsuariosSection';
import GetUsuarioByIdSection from './CrudSections/GetUsuarioByIdSection';
import PutUpdateSection from './CrudSections/PutUpdateSection';
import DeleteLogicoSection from './CrudSections/DeleteLogicoSection';
import DeleteFisicoSection from './CrudSections/DeleteFisicoSection';
import ReactivateUserSection from './CrudSections/ReactivateUserSection';

function ProjectsContent() {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Backend API Dashboard</h1>
            
            <div className="crud-sections-container">
                <TestSection />
                <GetUsuariosSection />
                <PostUsuariosSection />
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
