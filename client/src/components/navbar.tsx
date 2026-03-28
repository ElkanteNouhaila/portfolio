import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuBrainCircuit } from "react-icons/lu";


const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll detection for background blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section on scroll (only on home page)
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["skills", "about", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Smart scroll: if already on "/", scroll smoothly; if on another page, navigate then scroll
  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Page route links
  const pageLinks = [
    { name: "Dashboard", path: "/dashboard" },
  ];

  // Section anchor links
  const sectionLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0f0f0f]/80 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo — always goes home */}
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">

          {/* Section anchor links */}
          {sectionLinks.map((link) => {
            const isActive = pathname === "/" && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleSectionClick(link.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-[#b58742]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-[#b58742]/10 rounded-lg border border-[#b58742]/20" />
                )}
                {link.name}
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-2" />

          {/* Page route links */}
          {pageLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                pathname === link.path
                  ? "text-[#b58742]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {pathname === link.path && (
                <span className="absolute inset-0 bg-[#b58742]/10 rounded-lg border border-[#b58742]/20" />
              )}
              {link.name}
            </Link>
          ))}

          {/* CTA */}
          <button
            onClick={() => handleSectionClick("contact")}
            className="ml-4 px-5 py-2 text-sm font-semibold bg-[#b58742] text-black rounded-full hover:bg-[#c99a50] hover:shadow-lg hover:shadow-[#b58742]/25 transition-all duration-300"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0 w-0" : "w-4"}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0f0f0f]/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-1">

          {/* Section links */}
          <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-1">
            Sections
          </p>
          {sectionLinks.map((link) => {
            const isActive = pathname === "/" && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleSectionClick(link.id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#b58742]/10 text-[#b58742] border border-[#b58742]/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            );
          })}

          {/* Divider */}
          <div className="my-2 border-t border-white/5" />

          {/* Page links */}
          <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-1">
            Pages
          </p>
          {pageLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.path
                  ? "bg-[#b58742]/10 text-[#b58742] border border-[#b58742]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => handleSectionClick("contact")}
            className="mt-2 px-4 py-3 bg-[#b58742] text-black text-sm font-semibold rounded-lg text-center"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
