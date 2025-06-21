import Project from "./Project.jsx";
import RTBPreview from '../assets/RTBPreview.png';
import TOT from '../assets/tot-logo.png';
import STUDYROOM from '../assets/studyroom.png';

const Projects = () => {
    return (
        <>
            <div className="flex flex-col font-mono justify-center text-white border-solid border-4 border-matcha mx-auto my-8 max-w-7xl p-6 bg-light-black rounded-lg">
                <div className="text-4xl font-bold mb-6 text-center underline decoration-matcha">
                    Projects
                </div>
                <Project
                    image={"cartoonme.png"}
                    title="Chess Clone"
                    description="A Chess AI that plays as similar to me as possible."
                    link="./chessai"
                    target="_blank"
                >
                </Project>
                <Project
                    image={STUDYROOM}
                    title="Chess Openings Study Room"
                    description="Study books moves for given chess positions taken from Modern Chess Openings by Nick de Firmian. Built with React, Chess.js, and Chessboard.js."
                    link="./studychess"
                    target="_blank"
                />
                <Project 
                    image={RTBPreview}
                    title="Ride the Bus Card Game"
                    description="Built with Vanilla JS, HTML, CSS. Take a guess on traits of the next card in the deck, four correct guesses in a row awards a point. 1. Red/Black 2. higher/lower 3. in-between/outside 4. guess the suit"
                    link="/ride-the-bus/index.html"
                    target="_blank"
                />
                <Project
                    image={TOT}
                    title="Appalachian Trails Survey App"
                    description="React Native App for social scientists to survey hikers on the Appalachian Trails as a part of an Undergraduate Research opportunity."
                    link="./totapp"
                    target="_self"
                />
            </div>
        </>
    )
};

export default Projects;