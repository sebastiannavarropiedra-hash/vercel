import React from "react";
import '../Styles/ContactContent.css';

function ContactContent() {
    return (
        <div className="ContactContent">
            <h1>Contacto</h1>
            <p>Si deseas ponerte en contacto conmigo, puedes enviarme un correo electrónico a <a href="mailto:snpnavarro@outlook.com" target="_blank" rel="noopener noreferrer">snpnavarro@outlook.com</a> o seguirme en mis redes sociales:</p>
            <ul>
                <li><a href="https://www.linkedin.com/in/snpnavarro90?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com/sebastiannavarropiedra-hash/Portafolio" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.instagram.com/sebas_navaxx.p?igsh=MXZ0M215dHg4NjNyZA==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
        </div>
    );
}

export default ContactContent;