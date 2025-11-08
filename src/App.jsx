import misterio from "../public/misterio.png";
import { useState, useEffect } from "react";
import playersData from "./jogadoras.json";

export default function App() {
  const [round, setRound] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [usedPlayers, setUsedPlayers] = useState([]); // 👈 Jogadoras já usadas

  useEffect(() => {
    // 🔁 Filtra jogadoras ainda não usadas
    const availablePlayers = playersData.filter(
      (p) => !usedPlayers.includes(p.name)
    );

    // 🔀 Embaralha e escolhe 5 jogadoras
    const shuffled = [...availablePlayers].sort(() => 0.5 - Math.random());
    const chosen = shuffled.slice(0, 5);

    setSelectedPlayers(chosen);
    setRevealed([]);
  }, [round]);

  const handleReveal = (index) => {
    if (revealed.includes(index) || revealed.length >= 2 || gameOver) return;
    setRevealed((prev) => [...prev, index]);
  };

  const handleChoose = (player) => {
    if (gameOver) return;

    setScore((prev) => prev + player.gols);

    // 🧠 Marca as jogadoras dessa rodada como usadas
    setUsedPlayers((prev) => [...prev, ...selectedPlayers.map((p) => p.name)]);

    if (round === 1) {
      setTimeout(() => setRound(2), 400);
    } else {
      setTimeout(() => setGameOver(true), 600);
    }
  };

  const handleRestart = () => {
    setRound(1);
    setScore(0);
    setGameOver(false);
    setUsedPlayers([]); // 🔄 Resetar jogadoras usadas

    const shuffled = [...playersData].sort(() => 0.5 - Math.random());
    setSelectedPlayers(shuffled.slice(0, 5));
    setRevealed([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl sm:text-7xl font-bold mb-7 text-center">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          NEXT
        </span>{" "}
        Passa A Bola
      </h1>

      {!gameOver ? (
        <>
          <div className="flex flex-col sm:flex-row sm:gap-8 items-center text-center mb-6">
            <p className="text-lg sm:text-2xl mb-2 sm:mb-0">
              Rodada: <span className="font-semibold">{round} / 2</span>
            </p>
            <p className="text-lg sm:text-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-2xl">
              ⚽ Gols: <span className="font-semibold">{score}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-4xl">
            {selectedPlayers.map((player, index) => {
              const isRevealed = revealed.includes(index);
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-2xl p-4 text-center cursor-pointer hover:bg-gray-700 transition-all"
                  onClick={() => handleReveal(index)}
                >
                  {isRevealed ? (
                    <img
                      src={`/${player.imagem}`}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-2 object-cover"
                      alt={player.name}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-32 sm:h-40">
                      <img
                        src={misterio}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-2 object-cover"
                        alt="mistério"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {revealed.length === 2 && (
            <div className="mt-8 text-center">
              <h2 className="text-lg sm:text-xl mb-4">Escolha sua jogadora:</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {revealed.map((i) => {
                  const player = selectedPlayers[i];
                  return (
                    <button
                      key={i}
                      onClick={() => handleChoose(player)}
                      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-sm sm:text-base transition-all"
                    >
                      {player.name} - {player.posição}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            🏆 Fim do jogo!
          </h2>
          <p className="text-xl sm:text-2xl mb-6">
            Sua pontuação total foi:{" "}
            <span className="font-semibold text-green-400">{score}</span>
          </p>
          <button
            onClick={handleRestart}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-lg sm:text-xl font-semibold transition-all"
          >
            Novo Jogo 🔁
          </button>
        </div>
      )}
    </div>
  );
}
