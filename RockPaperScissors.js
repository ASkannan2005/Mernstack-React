import React, { useState, useEffect } from "react";
import "./RockPaperScissors.css";

// Import images from src folder
import rockImage from "./rock-emoji.png";
import paperImage from "./paper-emoji.png";
import scissorsImage from "./scissors-emoji.png";

const RockPaperScissors = () => {
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });
  const [result, setResult] = useState("");
  const [playerMove, setPlayerMove] = useState("");
  const [computerMove, setComputerMove] = useState("");

  const images = {
    rock: rockImage,
    paper: paperImage,
    scissors: scissorsImage,
  };

  useEffect(() => {
    const savedScore = JSON.parse(localStorage.getItem("score"));
    if (savedScore) setScore(savedScore);
  }, []);

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  const pickComputerMove = () => {
    const moves = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
  };

  const makeMove = (playerChoice) => {
    const compChoice = pickComputerMove();
    let gameResult = "";

    if (playerChoice === compChoice) {
      gameResult = "Tie.";
      setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
    } else if (
      (playerChoice === "rock" && compChoice === "scissors") ||
      (playerChoice === "paper" && compChoice === "rock") ||
      (playerChoice === "scissors" && compChoice === "paper")
    ) {
      gameResult = "You win.";
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      gameResult = "You lose.";
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }

    setResult(gameResult);
    setPlayerMove(playerChoice);
    setComputerMove(compChoice);
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, ties: 0 });
    localStorage.removeItem("score");
    setResult("");
    setPlayerMove("");
    setComputerMove("");
  };

  return (
    <div className="container">
      <p className="title">Rock Paper Scissors</p>

      <div className="button-container">
        {["rock", "paper", "scissors"].map((move) => (
          <button
            key={move}
            onClick={() => makeMove(move)}
            className="move-button"
          >
            <img src={images[move]} alt={move} className="move-icon" />
          </button>
        ))}
      </div>

      <p className="result">{result}</p>

      {playerMove && computerMove && (
        <p className="moves">
          You
          <img src={images[playerMove]} alt={playerMove} className="move-icon" />
          <img src={images[computerMove]} alt={computerMove} className="move-icon" />
          Computer
        </p>
      )}

      <p className="score">
        Wins: {score.wins}, Losses: {score.losses}, Ties: {score.ties}
      </p>

      <button className="reset-score-button" onClick={resetScore}>
        Reset Score
      </button>
    </div>
  );
};

export default RockPaperScissors;
