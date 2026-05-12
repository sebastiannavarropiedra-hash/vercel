import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Styles/Projects.css';
import ProjectsContent from '../Components/ProjectsContent';
import ParticlesBackground from '../Components/ParticlesBackground';
// Projects page component
// This page renders the site navigation, the project list, and the footer.
// The Navbar receives an "active" prop so it can highlight the current page.

{/*}Projects.jsx
 ├── Navbar
 ├── ProjectsContent
 │     ├── UsersTable
 │     ├── CreateUserForm
 │     ├── Stats
 │     └── API Cards
 └── Footer*/}
function Projects() {
    return (
        <>
            {/* Main container for the Projects page */}
            <div className='ProjectsContainer'>
                <ParticlesBackground />

                {/* Top navigation bar with the current page selected */}
                <Navbar active="Projects" />

                {/* Central content area for project cards, descriptions, etc. */}
                <div className="ProjectsContent">
                    <ProjectsContent />
                </div>

                {/* Footer shown at the bottom of the page */}
                <Footer />

            </div>
        </>
    );
}

export default Projects;
