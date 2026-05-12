import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NotFoundContent from '../Components/NotFoundContent';
import '../Styles/NotFound.css';
import ParticlesBackground from '../Components/ParticlesBackground';

function NotFound() {
    return (
        <>
            <div className='NotFoundContainer'>
                <ParticlesBackground />

                <Navbar active="NotFound" />

                <div className="NotFoundContent">
                    <NotFoundContent />
                </div>

                <Footer />

            </div>
        </>
    );
}

export default NotFound;
