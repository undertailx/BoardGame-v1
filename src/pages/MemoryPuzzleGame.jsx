import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Sun, Moon, RefreshCw, Undo2 } from "lucide-react";
import cat1 from "../imgs/cat1.jpg";
import cat2 from "../imgs/cat2.jpg";
import cat3 from "../imgs/cat3.gif";
import cat4 from "../imgs/cat4.gif";
import cat5 from "../imgs/cat5.gif";
import cat6 from "../imgs/cat6.jpg";
import cat7 from "../imgs/cat7.jpg";
import cat8 from "../imgs/cat8.jpg";

const MemoryPuzzleGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const images = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8];

  useEffect(() => {
    initializeGame();
    document.documentElement.classList.toggle('dark', darkTheme);
  }, [darkTheme]);

  const initializeGame = () => {
    const duplicatedImages = [...images, ...images];
    const shuffledCards = duplicatedImages
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves([0, 0]);
    setCurrentPlayer(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId) => {
    if (gameWon || flipped.length === 2 || flipped.includes(cardId) || matched.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    const newMoves = [...moves];
    newMoves[currentPlayer]++;

    setFlipped(newFlipped);
    setMoves(newMoves);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].image === cards[secondId].image) {
        setMatched([...matched, firstId, secondId]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) setGameWon(true);
      } else {
        setTimeout(() => {
          setFlipped([]);
          const nextPlayer = 1 - currentPlayer;
          setAlertMessage(`ตาผู้เล่นที่ ${nextPlayer + 1}`);
          setShowAlert(true);
          setCurrentPlayer(nextPlayer);
        }, 1000);
      }
    }
  };

  const isCardVisible = (cardId) => flipped.includes(cardId) || matched.includes(cardId);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  // Background gradient and light effect colors adjusted based on theme
  const bgGradient = darkTheme 
    ? "from-[#1a0b2e] via-[#120621] to-[#0a0313]" 
    : "from-[#e6e0f7] via-[#f0f3ff] to-[#f5f0ff]";
  
  const lightEffectColor = darkTheme 
    ? "bg-purple-600/20" 
    : "bg-purple-300/20";

  const cardBgGradient = darkTheme
    ? "from-purple-900/70 to-[#1a0b2e]"
    : "from-purple-200/50 to-purple-100/50";

  const textColor = darkTheme ? "text-white" : "text-[#1a0b2e]";
  const bgOverlay = darkTheme 
    ? "bg-[#1a0b2e]/70" 
    : "bg-white/80 border border-purple-200/50";

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br ${bgGradient} ${textColor} overflow-hidden`}
    >
      {/* Enhanced Light Effect with Multiple Layers */}
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        w-[600px] h-[600px] ${lightEffectColor} rounded-full blur-[200px] animate-pulse`}
      />
      <div 
        className={`absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 
        w-[400px] h-[400px] ${lightEffectColor} rounded-full blur-[150px] animate-pulse delay-500`}
      />

       {/* Theme Toggle */}
      <div className="absolute top-5 right-5 flex space-x-4 z-10">
        <button 
          onClick={toggleTheme} 
          className={`p-3 ${darkTheme ? 'bg-purple-800/50' : 'bg-purple-200/50'} rounded-full hover:bg-purple-700/50 transition`}
        >
          {darkTheme ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      {/* Left Toggle */}
      <div className="absolute top-5 left-5">
      <button
        onClick={() => navigate("/")} // นำทางไปที่หน้า Home เมื่อคลิก
        className="p-3  rounded-full hover:bg-gray-300/15 transition"
      >
        <Undo2 className="w-6 h-6" />
      </button>
    </div>


      <div className={`relative z-10 ${bgOverlay} backdrop-blur-lg rounded-2xl p-8 w-full max-w-4xl shadow-2xl`}>
        {/* Rest of the component remains the same */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${darkTheme ? 'text-purple-300' : 'text-purple-700'}`}>Memory Puzzle</h1>
          
          <div className="flex justify-center gap-8 mb-6">
            {["Player 1", "Player 2"].map((player, index) => (
              <div
                key={index}
                className={`rounded-xl px-6 py-3 transition-all duration-300  ${
                  currentPlayer === index 
                    ? (darkTheme ? "bg-purple-900/70 border-2 border-purple-700" : "bg-purple-300/50 border-2 border-purple-400")
                    : (darkTheme ? "bg-[#1a0b2e]/50 border-2 border-white/20" : "bg-white/50 ")
                }`}
              >
                <span className={`block mb-2 ${darkTheme ? 'text-purple-300' : 'text-purple-700'}`}>{player}</span>
                <div className={`text-2xl font-bold ${darkTheme ? 'text-white' : 'text-[#1a0b2e]'}`}>กด {moves[index]} ครั้ง</div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={initializeGame} 
            className={`flex items-center justify-center gap-2 px-6 py-3 ${darkTheme ? 'bg-purple-800/50' : 'bg-purple-300/50'} rounded-xl hover:bg-purple-700/50 transition`}
          >
            <RefreshCw className="w-5 h-5" /> New Game
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`relative aspect-square rounded-2xl cursor-pointer transform transition-all duration-500 ease-in-out ${
                isCardVisible(card.id) ? "rotate-0" : "rotate-y-180"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`absolute w-full h-full rounded-2xl transform transition-all duration-500 ${
                  isCardVisible(card.id) ? "rotate-0 opacity-100" : "rotate-y-180 opacity-0"
                }`}
              >
                <img 
                  src={card.image} 
                  alt="Card" 
                  className="w-full h-full object-cover rounded-2xl shadow-lg" 
                />
              </div>
              <div
                className={`absolute w-full h-full rounded-2xl bg-gradient-to-br ${cardBgGradient} transform transition-all duration-500 ${
                  isCardVisible(card.id) ? "rotate-y-180 opacity-0" : "rotate-0 opacity-100"
                } flex items-center justify-center`}
              >
                <div className={`text-4xl ${darkTheme ? 'text-purple-300' : 'text-purple-700'}`}>?</div>
              </div>
            </div>
          ))}
        </div>

        {/* Win Modal and Alert Modal - Themes adjusted accordingly */}
        {gameWon && (
          <div className={`mt-8 text-center ${darkTheme ? 'bg-purple-900/50' : 'bg-purple-300/50'} rounded-2xl p-8`}>
            <div className="flex items-center justify-center gap-3 text-3xl font-bold">
              <Trophy className="w-10 h-10 text-yellow-500" />
              <span className={darkTheme ? 'text-purple-300' : 'text-purple-700'}>Congratulations!</span>
            </div>
            <p className={`text-lg mt-2 ${darkTheme ? 'text-white' : 'text-[#1a0b2e]'}`}>
              {moves[0] === moves[1] ? "It's a tie!" : `Player ${moves[0] < moves[1] ? 1 : 2} Wins!`}
            </p>
            <button 
              onClick={initializeGame} 
              className={`mt-6 px-6 py-3 ${darkTheme ? 'bg-purple-800/50' : 'bg-purple-300/50'} rounded-xl hover:bg-purple-700/50 transition`}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className={`${darkTheme ? 'bg-[#1a0b2e]' : 'bg-white'} rounded-2xl p-8 w-96 text-center border ${darkTheme ? 'border-purple-900' : 'border-purple-200'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkTheme ? 'text-purple-300' : 'text-purple-700'}`}>แจ้งเตือน</h2>
            <p className={`text-lg ${darkTheme ? 'text-white' : 'text-[#1a0b2e]'}`}>{alertMessage}</p>
            <button 
              onClick={() => setShowAlert(false)} 
              className={`mt-6 px-6 py-3 ${darkTheme ? 'bg-purple-800/50' : 'bg-purple-300/50'} rounded-xl hover:bg-purple-700/50 transition`}
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryPuzzleGame;