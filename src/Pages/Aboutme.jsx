import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import AboutmeContent from '../Components/AboutmeContent';
import '../Styles/Aboutme.css';
import ParticlesBackground from '../Components/ParticlesBackground';
function Aboutme() {
    return (
        <>
            <div className='AboutmeContainer'>
                <ParticlesBackground />

                <Navbar active="Aboutme" />

                <div className="AboutmeContent">
                    <AboutmeContent />
                </div>

                <Footer />

            </div>
        </>
    );
}

export default Aboutme;
