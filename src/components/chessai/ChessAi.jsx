import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import ChessAiDB from "./ChessBot.js";

const ChessAi = () => {
  const [chess] = useState(new Chess());
  const [currentPosition, setCurrentPosition] = useState(chess.fen());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); 
  const [legalSquares, setLegalSquares] = useState({});
  const [highlightedSquares, setHighlightedSquares] = useState({});
  const [chessDBWhite, setChessDBWhite] = useState(new ChessAiDB("/tommyrosselli_black.txt"));
  const [moveList, setMoveList] = useState([]);

  const updateMoves = (newValue) => {
    setMoveList(prevItems => {
      const newItems = [...prevItems];
      newItems.push(newValue);
      return newItems; 
    });
  };

  const getBestMoveFromStockfishAPI = async (fen) => {
    try {
      const depth = 10;
      const encodedFen = encodeURIComponent(fen);
      const url = `https://stockfish.online/api/s/v2.php?fen=${encodedFen}&depth=${depth}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log("API response:", data);

      if (data.bestmove) {
        return data.bestmove;
      } else {
        throw new Error("No best move returned");
      }
    } catch (err) {
      console.error("Error fetching best move:", err);
      return null;
    }
  };

  const getComputerMove = async () => {
    console.log("*** Getting computer move ***");
    for (let i = 0; i < moveList.length; i++) {
      console.log("    Potential Move " + i + ": " + moveList[i]);
    }

    var bestMove = chessDBWhite.findBest(moveList);
    console.log("    Best move from DB: " + bestMove);
    if (!bestMove) {
      var possibleMoves = chessDBWhite.find(moveList);
      if (possibleMoves.length == 0) {
        console.log("NO DB MOVES FOUND");
        let response = await getBestMoveFromStockfishAPI(chess.fen());
        if (response) {
          console.log("    Best move from Stockfish API: " + response);
          bestMove = response;
          return bestMove;
        } else {
          console.log("    No best move found from Stockfish API, falling back to random move.");
          possibleMoves = chess.moves();
        }
      }
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      bestMove = possibleMoves[randomIndex];
    }
    console.log("    Best move: " + bestMove);
    console.log("    Best type: ", bestMove == null);
    updateMoves(bestMove);
    return bestMove;
  };

  const handleMove = (sourceSquare, targetSquare) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Always promote to a queen for simplicity
    });

    console.log("PLAYER MOVED: " + move.san);
    updateMoves(move.san);

    if (move) {
      setCurrentPosition(chess.fen());
      setIsPlayerTurn(false); 
      return true;
    }

    return false; 
  };

  const handleSquareRightClick = (square) => {
    setHighlightedSquares((prev) => {
      const updatedSquares = { ...prev }; 
      if (updatedSquares[square]) {

        delete updatedSquares[square];
      } else {
     
        updatedSquares[square] = {
            background: 'radial-gradient(circle, transparent 60%, rgba(0, 100, 0, 0.5) 60%)', 
            borderRadius: '50%', 
        };
      }
      return updatedSquares; 
    });
  };

  const handleSquareClick = () => {
    setHighlightedSquares({});
  };

  const handlePieceClick = (pieceType, sourceSquare) => {
    setHighlightedSquares({});
    const moves = chess.moves({ square: sourceSquare, verbose: true });
    if (moves.length > -1) {
      const newLegals = {};
      moves.forEach((move) => {
        newLegals[move.to] = {
            background: 'radial-gradient(circle, rgba(128, 128, 128, 0.4) 30%, transparent 30%)', // Center circle
            transition: 'all 0.3s ease-in-out',
        };
      });
      setLegalSquares(newLegals);
    }
  };

  // Highlight valid moves during drag
  const handlePieceDragBegin = (pieceType, sourceSquare) => {
    if (!isPlayerTurn) return;
    const moves = chess.moves({ square: sourceSquare, verbose: true });
    if (moves.length > 0) {
      const newLegals = {};
      moves.forEach((move) => {
        newLegals[move.to] = {
            background: 'radial-gradient(circle, rgba(128, 128, 128, 0.5) 30%, transparent 30%)', // Center circle
            transition: 'all 0.3s ease-in-out',
        };
      });
      setLegalSquares(newLegals);
    }
  };

  const handlePieceDragEnd = () => {
    setLegalSquares({});
    setHighlightedSquares({});
  };

useEffect(() => {
  if (!isPlayerTurn && !chess.isGameOver()) {
    const doAIMove = async () => {
      const aiMove = await getComputerMove();
      console.log("AI MOVE:", aiMove);

      if (aiMove) {
        chess.move(aiMove, { sloppy: true });
        setCurrentPosition(chess.fen());
      }

      setIsPlayerTurn(true);
    };

    doAIMove();
  }
}, [isPlayerTurn, chess]);

  return (
    <div className="relative mx-auto my-0 max-w-2xl p-4 bg-light-black rounded-md">
      <div className="flex justify-center items-center mb-4">
        <p className="text-white font-semibold">
          {chess.isGameOver() || chess.isCheckmate()
            ? "Game over!"
            : isPlayerTurn
            ? "Your turn"
            : "Computer is thinking..."}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4 p-2 bg-gray-800 rounded-md shadow-md">
        <div className="flex items-center gap-3">
          <img
            src="cartoonme.png"
            alt="Player"
            className="w-10 h-10"
          />
          <div className="text-white">
            <h1 className="text-xl font-bold">Tommy Bot</h1>
            <p className="text-sm font-semibold">1450</p>
          </div>
        </div>
      </div>

      <Chessboard
        position={currentPosition}
        onPieceDrop={(sourceSquare, targetSquare) =>
          isPlayerTurn && handleMove(sourceSquare, targetSquare)
        }
        arePiecesDraggable={isPlayerTurn} 
        onPieceClick={handlePieceClick}
        onSquareClick={handleSquareClick}
        onSquareRightClick={handleSquareRightClick}
        onPieceDragBegin={handlePieceDragBegin} 
        onPieceDragEnd={handlePieceDragEnd} 
        customSquareStyles={{
            
            ...highlightedSquares,
            ...legalSquares,
        }

        } 
        
      />
    </div>
  );
};

export default ChessAi;