import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Puzzle, Target } from 'lucide-react';
import Navbar from './Navbar';

export default function Home() {
  const games = [
    {
      name: 'Memory Puzzle Game',
      path: '/memory-puzzle',
      icon: Puzzle,
      description: 'จับลูกบอลให้ได้!',
      bgColor: 'from-purple-600 to-purple-800'
    },
    {
      name: 'Catch the Ball Game',
      path: '/CatchTheBall',
      icon: Target,
      description: 'ทดสอบความจำของคุณ!',
      bgColor: 'from-indigo-600 to-indigo-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#120621] to-[#0a0313] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold mb-6 text-purple-300 tracking-wide">
          มินิเกมข้ามเวลา!
        </h1>
        
        <p className="text-xl mb-12 text-purple-200 max-w-xl mx-auto">
          เพลิดเพลินไปกับคอลเลกชันเกมเล็กที่ทั้งสนุกและท้าทาย ทดสอบความสามารถของคุณและสนุกได้เลย!
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {games.map((game) => (
            <Link 
              key={game.name}
              to={game.path}
              className={`bg-gradient-to-br ${game.bgColor} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="flex flex-col items-center">
                <game.icon className="w-12 h-12 mb-4 text-white" />
                <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
                <p className="text-purple-100 text-sm">{game.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}