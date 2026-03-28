const Hero = () => {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[#0f0f0f] overflow-hidden">
        
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b58742]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#b58742]/5 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
  
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#b58742 1px, transparent 1px), linear-gradient(to right, #b58742 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
  
        <div className="relative z-10 text-center max-w-3xl px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b58742]/30 bg-[#b58742]/5 text-[#b58742] text-xs font-semibold tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b58742] animate-ping" />
            AVAILABLE FOR WORK
          </div>
  
          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Nouhaila{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b58742] to-[#e2b96f]">
              El Kante
            </span>
          </h1>
  
          {/* Role badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Chatbot Developer", "AI Enthusiast", "Full stack Developer"].map((role) => (
              <span
                key={role}
                className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
  
          {/* Description */}
          <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
  I create scalable and intelligent digital products by combining{" "}
  <span className="text-white font-medium">modern web technologies</span> with{" "}
  <span className="text-[#b58742] font-medium">advanced AI systems</span>.
</p>
  
          {/* CTA Buttons */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="#projects"
              className="group px-7 py-3.5 bg-[#b58742] text-black font-semibold rounded-full hover:bg-[#c99a50] hover:shadow-xl hover:shadow-[#b58742]/30 transition-all duration-300 flex items-center gap-2"
            >
              View Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 border border-[#b58742]/40 text-[#b58742] font-semibold rounded-full hover:bg-[#b58742]/10 hover:border-[#b58742] transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
  
          {/* Scroll indicator */}
          <div className="mt-16 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-gray-600 text-xs">
              <span>Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  