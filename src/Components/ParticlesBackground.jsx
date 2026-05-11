import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback } from "react";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    // Esta función inicializa el motor de partículas una sola vez
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = {
        // ESTA SECCIÓN ES LA QUE EVITA QUE SE VAYA AL INDEX.HTML
        fullScreen: { 
            enable: false 
        },
        particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
            },
            move: { enable: true }
        },
        detectRetina: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={options}
            /* Esta clase debe coincidir con tu CSS de position: absolute */
            className="particles-background" 
        />
    );
};

export default ParticlesBackground;