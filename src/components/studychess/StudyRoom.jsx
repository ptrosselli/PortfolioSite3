import { useState, useEffect } from "react";
import ChessNode from "./ChessNode";
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";

const StudyRoom = () => {
    const chessnode = new ChessNode("start");
    chessnode.init();
    const [game, setGame] = useState(new Chess());
    const [moves, setMoves] = useState([]);
    const [question, setQuestion] = useState("");
    const [solutions, setSolutions] = useState([]);
    const [squareStyles, setSquareStyles] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [toStart, setToStart] = useState(true);
    const [depth, setDepth] = useState(9);

    const onDrop = (sourceSquare, targetSquare) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
        });

        if (move) {
            setMoves((prevMoves) => [...prevMoves, move.san]);
            setAnswered(true);
        }

        console.log("MOBE: ", move);
        console.log("SOLUTIUONS: ", solutions);

        if (move && solutions.includes(move.san)) {
            console.log("Correct move!");
            setSquareStyles({
                [targetSquare]: { backgroundColor: "#00FF00" }, // Highlight target square green
            });
            setCorrectAnswers(correctAnswers + 1);
        } else {
            console.log("Incorrect move!");
            setSquareStyles({
                [targetSquare]: { backgroundColor: "#FF0000" }, // Highlight target square red
            });
            setIncorrectAnswers(incorrectAnswers + 1);
        }
        return move !== null;
    };

    const arrayToLine = (moveArray) => {
        let line = "";
        let moveNumber = 1;

        for (let i = 0; i < moveArray.length; i += 2) {
            line += `${moveNumber}. ${moveArray[i]} `;
            if (i + 1 < moveArray.length) {
                line += `${moveArray[i + 1]} `;
            }
            moveNumber++;
        }

        return line.trim();
    };

    const showMove = () => {
        setToStart(false); // Set toStart to false
        setSquareStyles({}); // Reset square styles
        setAnswered(false); // Reset answered state
        
        const results = chessnode.getLineRandom(depth, []);
        setSolutions(results[0]);

        const pgn = arrayToLine(results[1]);
        setQuestion(pgn);

        const updatedGame = new Chess();
        updatedGame.loadPgn(pgn);
        setGame(updatedGame); // Update game state with the new instance
    };

    useEffect(() => {
        if (question !== "" || solutions.length !== 0) {
            console.log("Question (PGN): ", question);
            console.log("Solutions: ", solutions);
            console.log("Moves: ", moves);
        }
    }, [question, solutions, moves]);

    return (
        <div className="border-solid border-4 border-matcha mx-auto my-8 w-full p-6 bg-light-black rounded-lg text-white flex gap-6">
            <div className="flex flex-col py-52 text-center flex-1 space-y-4">
                <p className="text-lg font-bold">Respond with an accurate book move in the given position.</p>
                <div className="text-base">{question}</div>
                {answered &&
                <>
                    <div className="text-sm">You answered: {moves[moves.length - 1]}</div>
                    <div className="text-sm">Correct answers: {solutions.join(", ")}</div>
                    <button onClick={showMove} className="bg-matcha text-white py-2 px-4 rounded-lg">Continue</button>
                </>
                }
                {toStart && <button onClick={showMove} className="bg-matcha text-white py-2 px-4 rounded-lg">Start</button>}
                
            </div>
    
            <div className="flex-1 flex justify-center items-center">
                <div className="w-5/6">
                    <Chessboard
                        position={game.fen()}
                        onPieceDrop={onDrop}
                        customSquareStyles={squareStyles}
                    />
                </div>
            </div>
        </div>
    );
};
export default StudyRoom;