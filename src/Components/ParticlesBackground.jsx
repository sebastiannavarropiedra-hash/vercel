import React from 'react';
import '../Styles/Particles.css'; // your CSS file

function ParticlesBackground() {
  return (
    <div className="particlesContainer alignfull">
      <div className="bubbles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} style={{ '--i': Math.floor(Math.random() * 18) + 3 }}></span>
        ))}
      </div>
    </div>
  );
}

export default ParticlesBackground;
