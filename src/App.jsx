
import { useState, useEffect } from "react";
import playersData from "./jogadoras.json";

export default function App() {
  const [round, setRound] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffled = [...playersData].sort(() => 0.5 - Math.random());
    setSelectedPlayers(shuffled.slice(0, 5));
    setRevealed([]);
  }, [round]);

  const handleReveal = (index) => {
    if (revealed.includes(index) || revealed.length >= 2) return;
    setRevealed((prev) => [...prev, index]);
  };

  const handleChoose = (player) => {
    setScore((prev) => prev + player.gols);

    if (round === 1) {
      setTimeout(() => setRound(2), 100);
    } else {
      setTimeout(() => alert(`🏆 Fim do jogo! Pontuação total: ${score + player.gols}`), 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center"><span className="bg-linear-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">NEXT</span> Passa A Bola</h1>

      <div className="flex flex-col sm:flex-row sm:gap-8 items-center text-center mb-6">
        <p className="text-lg sm:text-xl mb-2 sm:mb-0">
          Rodada: <span className="font-semibold">{round} / 2</span>
        </p>
        <p className="text-lg sm:text-xl">
          Pontuação total: <span className="font-semibold">{score}</span>
        </p>
      </div>

      {/* Grade de jogadoras */}
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
                <>
                  <img
                    src={player.imagem}
                    alt={player.name}
                    className="w-40 h-40 sm:w-24 sm:h-24 rounded-full mx-auto mb-2 object-cover"
                  />
                  {/* <p className="font-semibold text-sm sm:text-base">{player.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{player.gols} gols</p> */}
                </>
              ) : (
                <div className="flex items-center justify-center h-24 sm:h-32">
                  <p className="text-2xl sm:text-3xl font-bold">?</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Escolha entre as duas reveladas */}
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
                  {player.name} ({player.gols} gols)
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
