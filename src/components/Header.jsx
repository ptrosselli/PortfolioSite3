const Header = () => {
    const openHome = () => {
        window.open('./', '_self');
    }

    const openAbout = () => {
        window.open('./about', '_self');
    }

    const openProjects = () => {
        window.open('./projects', '_self');
    }

    const openChess = () => {
        window.open('https://www.chess.com/member/tommyrosselli')
    }

    const openGithub = () => {
        window.open('https://github.com/ptrosselli')
    }
    
    return (
        <div className="fixed font-mono w-full py-8 top-0 left-0 text-center text-xl flex items-center justify-between bg-dark-black text-white px-10 z-50">
            <div className="flex items-center space-x-8">
                <div onClick={openHome} className="px-4 py-1 rounded-lg hover:rounded-md hover:scale-110 hover:bg-matcha transition duration-300 bg-dark-black border-solid border-2 border-matcha transform">
                    Tommy Rosselli
                </div>
                <div onClick={openProjects} className="px-4 py-1 rounded-lg hover:rounded-md hover:scale-110 hover:bg-matcha transition duration-300 bg-dark-black border-solid border-2 border-matcha transform">
                    Projects
                </div>
                <div onClick={openAbout} className="px-4 py-1 rounded-lg hover:rounded-md hover:scale-110 hover:bg-matcha transition duration-300 bg-dark-black border-solid border-2 border-matcha transform">
                    About
                </div>
            </div>

            <div className="flex items-center space-x-8">
                <div onClick={openGithub} className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-125 hover:bg-matcha transition duration-300 bg-dark-black border-solid border-2 border-matcha transform">
                    <img 
                        className="w-12 h-12 rounded-full transition duration-300 hover:scale-125 bg-dark-black border-solid border-2 border-matcha transform group-hover:hidden" 
                        src="images.png" 
                        alt="Pawn" 
                    />
                </div>
                <div onClick={openChess} className="relative w-12 h-12 rounded-full group">
                    <img 
                        className="w-12 h-12 rounded-full transition duration-300 hover:scale-125 bg-dark-black border-solid border-2 border-matcha transform group-hover:hidden" 
                        src="chessicons/pawn.png" 
                        alt="Pawn" 
                    />
                    <img 
                        className="w-12 h-12 rounded-full transition duration-300 hover:scale-125 bg-dark-black border-solid border-2 border-matcha transform hidden group-hover:block" 
                        src="chessicons/queen.png" 
                        alt="Queen" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
