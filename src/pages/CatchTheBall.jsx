import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Play, RefreshCw, X, Undo2 } from "lucide-react";

// Import cat images
import cat1 from "../imgs/cat1.jpg";
import cat2 from "../imgs/cat2.jpg";
import cat3 from "../imgs/cat3.gif";
import cat4 from "../imgs/cat4.gif";
import cat5 from "../imgs/cat5.gif";
import cat6 from "../imgs/cat6.jpg";
import cat7 from "../imgs/cat7.jpg";
import cat8 from "../imgs/cat8.jpg";


const CatchTheBall = () => {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(true);
  const [score, setScore] = useState(0);
  const [ballPosition, setBallPosition] = useState({ top: "50%", left: "50%" });
  const [timer, setTimer] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentCatImage, setCurrentCatImage] = useState(cat1);

  const catImages = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8];

  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) return prev - 1;
          setGameOver(true);
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkTheme);
  }, [darkTheme]);

  const randomPosition = () => {
    const top = `${Math.random() * 80 + 10}%`;
    const left = `${Math.random() * 80 + 10}%`;
    return { top, left };
  };

  const handleBallClick = () => {
    setScore((prev) => prev + 1);
    setBallPosition(randomPosition());
    
    // Random cat image
    const randomCat = catImages[Math.floor(Math.random() * catImages.length)];
    setCurrentCatImage(randomCat);
  };

  const startGame = () => {
    setGameStarted(true);
    setBallPosition(randomPosition());
  };

  const resetGame = () => {
    setScore(0);
    setTimer(15);
    setBallPosition({ top: "50%", left: "50%" });
    setGameOver(false);
    setGameStarted(false);
  };

  const bgGradient = darkTheme
    ? "from-[#1a0b2e] via-[#120621] to-[#0a0313]"
    : "from-[#e6e0f7] via-[#f0f3ff] to-[#f5f0ff]";
  const textColor = darkTheme ? "text-white" : "text-[#1a0b2e]";

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${bgGradient} ${textColor}`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setDarkTheme(!darkTheme)}
          className="p-3 bg-purple-800/50 rounded-full hover:bg-purple-700/50 transition"
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
        <Undo2 className="w-7 h-7" />
      </button>
    </div>

      <h1 className="text-4xl font-bold mb-6">จับลูกบอล</h1>

      {/* Game Info */}
      <div className="text-center mb-8">
        <p className="text-2xl">เวลา: {timer} วินาที</p>
        <p className="text-2xl">คะแนน: {score}</p>
      </div>

      {/* Start Game / Ball Area */}
      {!gameStarted ? (
        <button 
          onClick={startGame}
          className="px-8 py-4 bg-purple-800/50 rounded-xl hover:bg-purple-700/50 transition flex items-center"
          
        >
          <Play className="w-6 h-6 mr-2" />
          Start
        </button>
      ) : !gameOver && (
        <div
          className="absolute w-24 h-24 rounded-full shadow-lg cursor-pointer overflow-hidden"
          style={{ 
            top: ballPosition.top, 
            left: ballPosition.left,
            backgroundImage: `url(${currentCatImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={handleBallClick}
        ></div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
            className={`bg-gradient-to-br ${
                darkTheme ? "from-[#1a0b2e] to-[#120621]" : "from-[#f0e6ff] to-[#e6e0f7]"
            } p-6 sm:p-8 rounded-xl shadow-xl text-center relative max-w-md w-11/12 sm:w-full`}
            >

            {/* ข้อความแสดงผล */}
            <h2 className={`text-3xl font-bold mb-4 ${darkTheme ? "text-white" : "text-slate-900"}`}>
                เกมจบแล้ว!
            </h2>
            <p className={`text-xl mb-6 ${darkTheme ? "text-purple-300" : "text-slate-700"}`}>
                คะแนนรวม: {score}
            </p>

            {/* ปุ่มเริ่มใหม่ */}
            <div className="flex justify-center">
                <button
                onClick={resetGame}
                className={`px-6 py-3 ${
                    darkTheme ? "bg-purple-800/50" : "bg-purple-300/50"
                } rounded-xl hover:bg-purple-700/50 transition flex items-center`}
                >
                <RefreshCw className="w-5 h-5 mr-2" />
                เริ่มใหม่
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default CatchTheBall;