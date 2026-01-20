import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-md shadow-lg border-b border-gray-700/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link className="font-bold text-2xl tracking-wide text-white drop-shadow">
          Confessions
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full shadow-md transition duration-200"
            to="/add"
          >
            + Add Confession
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-3xl text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-black/90 border-t border-gray-700 shadow-lg p-4 space-y-3">
          <Link 
            className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-full shadow"
            onClick={() => setOpen(false)}
            to="/add"
          >
            + Add Confession
          </Link>
        </div>
      )}
    </nav>
  );
}
