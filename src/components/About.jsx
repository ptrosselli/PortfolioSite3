const About = () => {
    return (
        <>
            <div className="flex flex-col font-mono justify-center text-white border-solid border-4 border-matcha mx-auto my-8 max-w-7xl p-6 bg-light-black rounded-lg">
                <div className="text-4xl font-bold mb-6 text-center underline decoration-matcha">
                    About this Website
                </div>
                <div className="text-center text-xl">
                    This website is built with the <span style={{ color: '#FFFF00', fontWeight: 'bold' }}>react framework</span> and <span style={{ color: '#00FFFF', fontWeight: 'bold' }}>tailwindcss</span>. 
                    It is a portfolio website for myself, Thomas Rosselli, and is always a work in progres. 
                    Code for this website is available at my github <span style={{ color: '#2dba4e', fontWeight: 'bold' }}>ptrosselli</span> and is open source.
                    This site will never ask for your location, personal information, or any other data.
                    The most recent update was January 2025.

                </div>
            </div>

            <div className="flex flex-col font-mono justify-center text-white border-solid border-4 border-matcha mx-auto my-8 max-w-7xl p-6 bg-light-black rounded-lg">
                <div className="text-4xl font-bold mb-6 text-center underline decoration-matcha">
                    About Tommy Rosselli
                </div>
                <div className="text-2xl font-bold mb-6 text-center underline decoration-matcha">
                    Contactables
                </div>
                <div className="text-center text-xl">
                    <div>ptrosselli@gmail.com</div>
                    <div>thomasrosselli@vt.edu</div>
                    <div>(631)-662-5878</div>
                </div>
                <br/>
                <div className="text-2xl font-bold mb-6 text-center underline decoration-matcha">
                    Academic Background
                </div>
                <div className="text-center text-xl">
                    Studies computer science at <span style={{ color: '#B92332', fontWeight: 'bold' }}>Virginia</span> <span style={{ color: '#CF4420', fontWeight: 'bold' }}>Tech</span>. Graduated highschool in 2021, undergraduate with a BS in Computer Science in May 2025, graudate with
                    a Masters in Engineering Software Applications in May 2026.
                </div>
                <br></br>
                <div className="text-2xl font-bold mb-6 text-center underline decoration-matcha">
                    Hobbies and Interests
                </div>
                <div className="text-center text-xl">
                    One of my favorite pastimes is playing chess, I often find myself having the most screentime on my phone on the official chess.com app.
                    I love to program with different languages and frameworks. I have a corgi named Chubbs who is the best dog in the world. 
                </div>
            </div>

            <div className="flex flex-col font-mono justify-center text-white border-solid border-4 border-matcha mx-auto my-8 max-w-7xl p-6 bg-light-black rounded-lg">
                <div className="text-4xl font-bold mb-6 text-center underline decoration-matcha">
                    About Chubbs
                </div>
                <div className="flex flex-row justify-center gap-4">
                    <img className="w-96 h-auto" src="chubbs/chubbers.png" alt="Chubbs 1" />
                    <img className="w-96 h-auto" src="chubbs/chubbs1.jpg" alt="Chubbs 2" />
                </div>
                <div className="flex flex-row justify-center gap-4 mt-4">
                    <img className="w-96 h-auto" src="chubbs/chubbs2.PNG" alt="Chubbs 3" />
                    <img className="w-96 h-auto" src="chubbs/chubbs3.PNG" alt="Chubbs 4" />
                </div>
                <div className="text-center text-xl">
                    Chubbs is a corgi that likes chasing rabbits that he never catches, barking at nothing, and whatever food you eat in front of him. He is very affectionate and does not like to sleep alone. 
                    His favorite places to be pet are behind the ears and along the white strip on his head. 
                </div>
            </div>

        </>


        
    );
};

export default About;
