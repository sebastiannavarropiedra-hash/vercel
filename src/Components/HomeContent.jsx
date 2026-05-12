import React from "react";
import INFO from "../Data/user";
import "../Styles/HomeContent.css";
import ParticlesBackground from "./ParticlesBackground";

function HomeContent() {


    return (
        <>

            <div className="home-container">
                <div className="homepage-first-area">
                    <div className="homepage-first-area-left-side ">
                        <div className="title homepage-title">
                            {INFO.homepage.title}
                        </div>

                        <div className="subtitle homepage-subtitle">
                            {INFO.homepage.description}
                        </div>
                    </div>

                    <div className="homepage-first-area-right-side">
                        <div className="homepage-image-container">
                            <div className="homepage-image-wrapper">
                                <div className="glow"></div>
                                <div className="particles">
                                    <div className="rotate">
                                        <div className="angle">
                                            <div className="size">
                                                <div className="position">
                                                    <div className="pulse">
                                                        <div className="particle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="angle">
                                            <div className="size">
                                                <div className="position">
                                                    <div className="pulse">
                                                        <div className="particle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="angle">
                                            <div className="size">
                                                <div className="position">
                                                    <div className="pulse">
                                                        <div className="particle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeContent;