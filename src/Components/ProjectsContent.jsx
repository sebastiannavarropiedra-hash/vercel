/**
 * ProjectsContent Component
 * 
 * Main dashboard page that displays all CRUD operations as separate, scrollable sections.
 * Each section represents a different API route and demonstrates how to interact with the backend.
 * 
 * Structure:
 * - Main title: "Backend API Dashboard"
 * - Container with all CRUD section components stacked vertically
 * 
 * Sections included:
 * 1. TestSection - Verify API connection
 * 2. GetUsuariosSection - Fetch and display all users
 * 3. PostUsuariosSection - Create a new user
 * 4. GetUsuarioByIdSection - Search for a specific user by ID
 * 5. PutUpdateSection - Update user information
 * 6. ReactivateUserSection - Reactivate an inactive user
 * 7. DeleteLogicoSection - Soft delete (deactivate) a user
 * 8. DeleteFisicoSection - Hard delete (permanent) a user
 */

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
