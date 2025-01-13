import Card from './Card.jsx';
import RTBPreview from '../assets/RTBPreview.png';
import TOT from '../assets/tot-logo.png';

const FeaturedProjects = () => {
    return(
        <div className="border-solid border-4 border-matcha mx-auto my-8 max-w-7xl p-6 bg-light-black rounded-lg">
            <div className="text-white text-3xl font-bold mb-6 text-center underline decoration-matcha">
                Featured Projects
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                <Card 
                    image={RTBPreview}
                    title="Ride the Bus Card Game"
                    description="Built with Vanilla JS, HTML, CSS. Take a guess on traits of the next card in the deck, four correct guesses in a row awards a point. 1. Red/Black 2. higher/lower 3. in-between/outside 4. guess the suit"
                    link="/ride-the-bus/index.html"
                    target="_blank"
                />
                <Card
                    image={TOT}
                    title="Appalachian Trails Survey App"
                    description="React Native App for social scientists to survey hikers on the Appalachian Trails as a part of an Undergraduate Research opportunity."
                    link="./totapp"
                    target="_self"
                />
            </div>
        </div>
    );
}

export default FeaturedProjects;