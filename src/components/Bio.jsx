const Bio = () => {
    return (
        <div className="flex text-white border-solid border-4 border-matcha mx-auto my-8 max-w-7xl p-6 bg-light-black rounded-lg">
            {/* Left Section: Image */}
            <div className="flex items-center justify-center w-1/3">
                <img 
                    src="GRADPIC.JPG" 
                    alt="Profile" 
                    className="rounded-full w-48 h-48 object-cover border-4 border-matcha"
                />
            </div>

            {/* Right Section: About Me and Text */}
            <div className="w-2/3 flex flex-col justify-center space-y-4 px-6">
                <div className="text-3xl font-bold underline decoration-matcha">About Me</div>
                <div className="text-lg">
                    I was born and raised on Long Island, NY. Senior Computer Science Major at <span style={{ color: '#B92332', fontWeight: 'bold' }}>Virginia</span> <span style={{ color: '#CF4420', fontWeight: 'bold' }}>Tech</span> pusrsuing a 4+1 Accelerated Masters in Engineering Software Applications. 
                    While I complete my degrees I work in quality assurance at AATechnology and as a server at my favorite restaurant The Shed in Huntington during the summertime.
                </div>
            </div>
        </div>
    );
};

export default Bio;
