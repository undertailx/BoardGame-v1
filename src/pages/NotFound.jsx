import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          หน้าไม่พบ
        </h2>
        <p className="text-gray-600 mb-8">
          ขออภัย หน้าที่คุณกำลังค้นหาไม่สามารถพบได้
        </p>
        <Link 
          to="/" 
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default NotFound;