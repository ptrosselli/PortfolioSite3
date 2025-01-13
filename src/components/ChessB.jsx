import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessB = () => {
  const chess = new Chess();
  const [moveIndex, setMoveIndex] = useState(0);
  const [moves, setMoves] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(chess.fen()); // Start at the initial position

  const loadPGN = (pgn) => {
    chess.reset(); // Reset the game to the starting position
    chess.loadPgn(pgn); // Load the PGN
    setMoves(chess.history()); // Get all moves from the PGN
    setMoveIndex(0); // Set the move index to the beginning
  };

  const handleBack = () => {
    if (moveIndex > 0) {
      chess.reset();
      for (let i = 0; i < moveIndex - 1; i++) {
        chess.move(moves[i]);
      }
      setMoveIndex(moveIndex - 1);
      setCurrentPosition(chess.fen());
    }
  };

  const handleNext = () => {
    if (moveIndex < moves.length) {
      chess.reset();
      for (let i = 0; i <= moveIndex; i++) {
        chess.move(moves[i]);
      }
      setMoveIndex(moveIndex + 1);
      setCurrentPosition(chess.fen());
    }
  };

  // Example PGN, replace with your own
  const examplePGN = `
    1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nc3 d5 6. exd5 Nxd5 7. Nxc6 bxc6
    8. Qf3 Bb4 9. Bd2 Qe7+ 10. Be2 O-O 11. O-O Re8 12. Rfe1 Bxc3 13. bxc3 Qd7 14. c4
    Nf6 15. Bc3 Ne4 16. Rad1 Qf5 17. Bd3 Qxf3 18. gxf3 Nd6 19. c5 Rxe1+ 20. Rxe1 Bf5
    21. cxd6 Bxd3 22. cxd3 cxd6 23. Ba5 f5 24. Re6 Rb8 25. Bc3 c5 26. Rxd6 Rb7 27.
    Rd5 Rb5 28. Rxf5 g6 29. Rd5 h5 30. d4 cxd4 31. Rxb5 dxc3 32. Rc5 Kf7 33. Rxc3
    Ke6 34. Rc7 a5 35. Ra7 Kf5 36. Rxa5+ Kf4 37. Rb5 Kxf3 38. a4 Kg4 39. a5 Kf3 40.
    a6 Ke4 41. a7 Kd3 42. a8=Q h4 43. Qd5+ Kc2 44. Qb3+ Kc1 45. Qb2+ Kd1 46. Ra5 h3
    47. Ra1# 1-0
  `;

  React.useEffect(() => {
    loadPGN(examplePGN); // Load the PGN when the component mounts
  }, []);

  const playerTop = {
    name: 'The Master BOT',
    rating: '2100',
    picture: 'the-master-BOT.png',
  };

  const playerBottom = {
    name: 'Tommy Rosselli',
    rating: '1327',
    picture: 'chubbs/chubbers.png',
  };

  const newTab = () => {
    window.open('./chessbsolo');
  }

  return (
    <div className="relative border-solid border-4 border-matcha mx-auto my-0 max-w-7xl p-6 bg-light-black rounded-lg">
      <div className="text-white text-xl font-bold mb-6 text-center">
        Check out this game I played on 3-crown difficulty to beat <br/> the 2100 rated chess-master-BOT on Chess.com!!!
      </div>
      <div className="flex justify-center">
        <div 
          onClick={newTab} 
          className="inline-block text-white text-center px-4 py-2 rounded-lg hover:rounded-md hover:bg-matcha transition duration-300 bg-light-black border border-matcha transform">
          Open this in a new tab
        </div>
      </div>

      {/* Player at the top */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={playerTop.picture}
            className="w-10 h-10 rounded-none mr-3"
          />
          <div>
            <p className="text-white font-semibold">{playerTop.name}</p>
            <p className="text-white text-sm">({playerTop.rating})</p>
          </div>
        </div>
      </div>

      {/* Chessboard */}
      <Chessboard
        position={currentPosition}
        arePiecesDraggable={false} // Prevent piece dragging during navigation
      />

      {/* Player at the bottom */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <img
            src={playerBottom.picture}
            className="w-10 h-10 rounded-none mr-3"
          />
          <div>
            <p className="text-white font-semibold">{playerBottom.name}</p>
            <p className="text-white text-sm">({playerBottom.rating})</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleBack}
          className="text-2xl px-4 py-2 bg-gray-600 text-white hover:text-matcha rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          onClick={() => {
            chess.reset();
            setMoveIndex(0);
            setCurrentPosition(chess.fen()); // Reset to the start position
          }}
          className="text-2xl px-4 py-2 bg-gray-600 text-white hover:text-matcha rounded hover:bg-gray-500"
        >
          Reset
        </button>
        <button
          onClick={handleNext}
          className="text-2xl px-4 py-2 bg-gray-600 text-white hover:text-matcha rounded hover:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChessB;
