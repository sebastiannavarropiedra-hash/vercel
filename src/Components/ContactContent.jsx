import React from "react";
import '../Styles/ContactContent.css';
import EmailForm from "./EmailForm";

/**
 * ContactContent Component
 *
 * This component renders the main contact section of the application.
 * It includes:
 * - An email form for direct communication.
 * - A list of external links to social media and professional profiles.
 *
 * Styling is applied from `ContactContent.css`.
 */
function ContactContent() {
    return (
        <div className="ContactContent">
            {/* Email form for users to send messages */}
            <EmailForm />
            <br />

            {/* Social media and professional profile links */}
            <ul>
                <li>
                    <a
                        href="https://www.linkedin.com/in/snpnavarro90?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/sebastiannavarropiedra-hash"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.instagram.com/sebas_navaxx.p?igsh=MXZ0M215dHg4NjNyZA=="
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Instagram
                    </a>
                </li>
            </ul>
        </div>
    );
}

/**
 * Exports the ContactContent component for use in other parts of the app.
 */
export default ContactContent;
