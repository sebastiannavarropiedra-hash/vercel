import React from "react";
import INFO from "../Data/user";
import "../Styles/AboutmeContent.css";
function AboutmeContent() {
    return (
        <>
            <div className="AboutmeContentContainerone row">
                <div className="Aboutmefirstarea col-md-6">
                    <div className="AboutmeTitle">
                        {INFO.about.title}
                    </div>

                    <div className="AboutmeDescription">
                        {INFO.about.description}
                    </div>
                </div>
                <div className="AboutmeSecondarea col-md-5">
                    <div className="AboutmeImageContainer">
                        <div className="AboutmeImageWrapper">
                            <img src={INFO.about.selfie} alt="image not found" className="AboutmeImage" />
                        </div>
                    </div>
                </div>



            </div>

            <div className="AboutmeContentContainertwo row">
                <div className="AboutmeThirdarea col-4">
                    <div className="Aboutmeskillsleft">Experience</div>
                </div>

                <div className="AboutmeFourtharea col-7">
                    <div className="Aboutmeskillsright">
                        <div className="experience-list">
                            <ul className="list-group list-group-numbered ">
                                <li className="experience-item active">

                                    <div className="experience-left">

                                        <h3>
                                            {INFO.experience[0].company}
                                            <span> {INFO.experience[0].title}</span>
                                        </h3>

                                        <p>
                                            {INFO.experience[0].description}
                                        </p>

                                    </div>

                                    <div className="experience-date">
                                        {INFO.experience[0].duration}
                                    </div>

                                </li>

                                <li className="experience-item">

                                    <div className="experience-left">

                                        <h3>
                                            {INFO.experience[1].company}
                                            <span> {INFO.experience[1].title}</span>
                                        </h3>

                                        <p>
                                            {INFO.experience[1].description}
                                        </p>

                                    </div>

                                    <div className="experience-date">
                                        {INFO.experience[1].duration}
                                    </div>

                                </li>

                                <li className="experience-item">

                                    <div className="experience-left">

                                        <h3>
                                            {INFO.experience[2].company}
                                            <span> {INFO.experience[2].title}</span>
                                        </h3>

                                        <p>
                                            {INFO.experience[2].description}
                                        </p>

                                    </div>

                                    <div className="experience-date">
                                        {INFO.experience[2].duration}
                                    </div>

                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <div className="AboutmeContentContainerThree row">
                <div className="AboutmeThirdarea col-4">
                    <div className="Aboutmeskillsleft">Education</div>
                </div>

                <div className="AboutmeFourtharea col-7">
                    <div className="Aboutmeskillsright education-list">
                        <ul className="list-group">
                            {INFO.education.map((item, index) => (
                                <li className="education-item" key={index}>

                                    <div className="education-left"><h3><strong>{item.degree}</strong></h3><p>{item.institution}</p></div>
                                    {item.duration && <div className="education-date">{item.duration}</div>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AboutmeContent;