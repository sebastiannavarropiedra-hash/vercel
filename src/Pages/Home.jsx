import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HomeContent from '../Components/HomeContent';
import '../Styles/Home.css';
function Home() {
    return (

        <>
            <div className='HomeContainer'>

                <Navbar active="Home" />

                <div className="HomeContent">
                    <HomeContent />
                </div>

                <Footer />

            </div>
        </>
            );
}

            export default Home;
