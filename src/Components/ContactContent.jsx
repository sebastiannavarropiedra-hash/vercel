import React from "react";
import '../Styles/ContactContent.css';
import EmailForm from "./EmailForm";

function ContactContent() {
    return (
        <div className="ContactContent">
            <EmailForm />
            <br/>
            
            <ul>
                <li><a href="https://www.linkedin.com/in/snpnavarro90?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com/sebastiannavarropiedra-hash" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.instagram.com/sebas_navaxx.p?igsh=MXZ0M215dHg4NjNyZA==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
        </div>
    );
}

export default ContactContent;