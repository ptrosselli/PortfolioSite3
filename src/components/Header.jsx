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
        <div className="fixed top-0 left-0 w-full z-50 bg-dark-black text-white px-4 sm:px-6 md:px-10 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between font-mono text-base sm:text-xl">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-6 mb-2 sm:mb-0">
                <button onClick={openHome} className="px-4 py-1 rounded-lg border-2 border-matcha hover:bg-matcha hover:scale-105 transition duration-300">
                    Tommy Rosselli
                </button>
                <button onClick={openProjects} className="px-4 py-1 rounded-lg border-2 border-matcha hover:bg-matcha hover:scale-105 transition duration-300">
                    Projects
                </button>
                <button onClick={openAbout} className="px-4 py-1 rounded-lg border-2 border-matcha hover:bg-matcha hover:scale-105 transition duration-300">
                    About
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={openGithub} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-matcha hover:scale-110 transition duration-300">
                    <img src="images.png" alt="GitHub" className="w-full h-full rounded-full" />
                </button>
                <div onClick={openChess} className="relative w-10 h-10 sm:w-12 sm:h-12 group">
                    <img
                        src="chessicons/pawn.png"
                        alt="Pawn"
                        className="w-full h-full rounded-full border-2 border-matcha transition duration-300 group-hover:hidden"
                    />
                    <img
                        src="chessicons/queen.png"
                        alt="Queen"
                        className="w-full h-full rounded-full border-2 border-matcha transition duration-300 hidden group-hover:block"
                    />
                </div>
            </div>

        </div>
    );
}

export default Header;
