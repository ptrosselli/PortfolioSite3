const Totapp = () => {
    return (
        <>
            <div className="flex flex-col font-mono justify-center text-white border-solid border-4 border-matcha mx-auto my-8 max-w-7xl p-6 bg-light-black rounded-lg">
                <div className="text-4xl font-bold mb-6 text-center underline decoration-matcha">
                    Appalachian Trails Survey App
                </div>
                <div className="text-center text-xl">
                    The Appalachian trails span 2,194 miles and 14 states. A trip to hike them can take anywhere from 5-7 months, but thousands make the journey every year.
                    This app is designed to send hikers surveys while they're on the trails to gather data for social scientists. Hikers will be incentivized to complete the surveys monetarily,
                    so long as they complete each survey over the course of a 14 week period. I was given the opportunity to join a team of undergraduate 
                    developers from my university led by Dr. Scott McCrickard to develop the app.
                </div>
                <br/>
                <div className="flex flex-row justify-evenly">
                    <img className="w-60 h-auto" src="tot/tot0.PNG" alt="Tot 0" />
                    <img className="w-60 h-auto" src="tot/tot1.PNG" alt="Tot 1" /> 
                    <img className="w-60 h-auto" src="tot/tot2.PNG" alt="Tot 2" />
                    <img className="w-60 h-auto" src="tot/tot3.PNG" alt="Tot 3" /> 

                </div>
                <br/>
                <div className="text-center text-xl">
                    The app is built using <span style={{ color: '#FFFF00', fontWeight: 'bold' }}>react-native</span> and <span style={{ color: '#FF073A', fontWeight: 'bold' }}>firebase</span>. The app will be available on the app store and google play store before the summer of 2025.
                </div>
            </div>  
        </>

    );
};

export default Totapp;