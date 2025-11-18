import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-700 tracking-tight">
        ตารางอาหารกลางวันเดือนพฤศจิกายน
      </h1>
      <p className="mt-2 text-lg text-slate-600">
        เมนูอาหารไทยหลากหลาย พร้อมรูปภาพประกอบสวยงามสำหรับทุกวัน
      </p>
    </header>
  );
};

export default Header;
