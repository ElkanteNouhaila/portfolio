import {Link} from "react-router-dom";
import { LuBrainCircuit } from "react-icons/lu";

export const Footer = () => (
  <footer className="bg-[#0a0a0a] border-t border-white/5 text-white py-8 px-6">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
      <Link
          to="/"
          className="group flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <LuBrainCircuit className="text-[#b58742] w-6 h-6" />
          {/* Text */}
          <span className="font-bold text-xl text-white">
            Nouhaila <span className="text-[#b58742]">El Kante</span>
          </span>
        </Link>
      </div>

      <p className="text-gray-600 text-xs text-center">
        © {new Date().getFullYear()} Nouhaila El Kante. Crafted with love and coffee
      </p>

      <div className="flex items-center gap-4 text-gray-600 text-xs">
        <a href="#about" className="hover:text-[#b58742] transition-colors">About</a>
        <a href="#projects" className="hover:text-[#b58742] transition-colors">Projects</a>
        <a href="#contact" className="hover:text-[#b58742] transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);
