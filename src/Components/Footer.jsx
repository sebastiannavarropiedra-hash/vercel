import React from "react";
import '../Styles/Footer.css';
import { NavLink } from "react-router-dom";


function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="container-fluid seccionfooter ">
        <div>

          {/* Social Media Icons */}
          <div className="redes-sociales mb-3">
            <NavLink to="https://www.facebook.com/share/14cspxpymXu/" className="icono">
              <i className="fab fa-facebook"></i>
            </NavLink>

            <NavLink to="https://www.instagram.com/sebas_navaxx.p?igsh=MXZ0M215dHg4NjNyZA==" className="icono">
              <i className="fab fa-instagram"></i>
            </NavLink>

            <NavLink to="https://www.linkedin.com/in/snpnavarro90?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="icono">
              <i className="fab fa-linkedin"></i>
            </NavLink>
          </div>

          {/* Horizontal Line */}
          <hr className="linea-footer" />

          {/* Copyright */}
          <p>© 2026 Todos los derechos reservados</p>

        </div>
      </footer>
    </>
  );
}

export default Footer;