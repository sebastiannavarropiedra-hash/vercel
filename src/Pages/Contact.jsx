import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ContactContent from '../Components/ContactContent';
import '../Styles/Contact.css';

function Contact() {
    return (
        <>
            <div className='ContactContainer'>

                <Navbar active="Contact" />

                <div className="ContactContent">
                <ContactContent />
                </div>

                <Footer />

            </div>

        </>
    );
}

export default Contact;
