import { FC, useState } from "react";
import { Game, GuessResult } from "../types";
import Guess from "./Guess";
import GuessInput from "./GuessInput";
import HighscoreForm from "./HighscoreForm";

type GameScreenProps = {
  game: Game;
  onReset: () => void;
}

const GameScreen: FC<GameScreenProps> = ({ game, onReset }) => {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [highscoreSubmitted, setHighscoreSubmitted] = useState(false);

  const won = guesses.some(guess => guess.correct);

  return (
    <div>
      <h1>GAME</h1>
      <ul>
        {guesses.map((guess, index) => {
          return (
            <li key={index}>
              <Guess result={guess} />
            </li>
          );
        })}
      </ul>
      {won && highscoreSubmitted && (
        <div>
          <h1>Thank you!</h1>
          <ul>
            <li><a href="/highscore">Go to highscore</a></li>
            <li>
              <a
                href="/"
                onClick={(ev) => {
                  ev.preventDefault();
                  onReset();
                }}
              >
                Play again
              </a>
            </li>
          </ul>
        </div>
      )}
      {won && !highscoreSubmitted && (
        <HighscoreForm
          onSubmit={async (name) => {
            await fetch(`/api/games/${game.id}/highscore`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
              }),
            });

            setHighscoreSubmitted(true);
          }}
        />
      )}
      {!won && (
        <GuessInput
          onSubmit={async (guess) => {
            const res = await fetch(`/api/games/${game.id}/guesses`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                guess
              })
            });

            const payload = await res.json();
            const allGuesses = guesses.concat([payload.data]);
            setGuesses(allGuesses);
          }}
          wordLength={game.wordLength}
        />
      )}
    </div>
  );
}

export default GameScreen;