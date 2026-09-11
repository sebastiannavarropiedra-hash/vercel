import React from 'react';
import '../Styles/Particles.css'; // your CSS file

function ParticlesBackground() {
  return (
    <div className="particlesContainer ">
      <div className="bubbles">
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} style={{ '--i': Math.floor(Math.random() * 18) + 2 }}></span>
        ))}
      </div>
    </div>
  );
}

export default ParticlesBackground;
