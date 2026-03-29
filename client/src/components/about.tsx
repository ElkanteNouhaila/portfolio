const About = () => {
  const stats = [
    { value: "2+", label: "Years Learning AI & Chatbots" },
    { value: "3+", label: "Projects Completed" },
    { value: "1+", label: "Internships / Volunteer Work" },
  ];
  
    return (
      <section className="py-24 bg-[#0a0a0a] text-white px-6" id="about">
        <div className="max-w-5xl mx-auto">
  
          {/* Section label */}
          <p className="text-[#b58742] text-xs font-semibold tracking-widest text-center uppercase mb-3">
            Get To Know Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            About <span className="text-[#b58742]">Me</span>
          </h2>
  
          <div className="flex flex-col md:flex-row items-center gap-14">
            
            {/* Image */}
            <div className="w-full md:w-2/5 flex justify-center">
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-3 rounded-2xl border border-[#b58742]/20 rotate-3" />
                <div className="absolute -inset-3 rounded-2xl border border-[#b58742]/10 -rotate-3" />
                <img
                  src="/picture.jpeg"
                  alt="Nouhaila El Kante"
                  className="relative w-64 h-72 object-cover rounded-2xl shadow-2xl"
                />
                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 bg-[#b58742] text-black text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
                  AI Developer
                </div>
              </div>
            </div>
  
            {/* Content */}
            <div className="w-full md:w-3/5">
              <h3 className="text-2xl font-bold mb-4">
                Hi, I'm{" "}
                <span className="text-[#b58742]">Nouhaila El Kante</span> 
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                A Chatbot Developer and AI enthusiast specializing in building
                intelligent web applications. I blend modern React frontends with
                powerful AI backends to create seamless user experiences.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                From designing interactive UIs to training NLP intent classifiers,
                I love projects that sit at the intersection of creativity and
                cutting-edge technology.
              </p>
  
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-[#b58742]/40 transition-colors duration-300"
                  >
                    <p className="text-2xl font-bold text-[#b58742]">{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
  
              {/* Resume button */}
              <a
                href="/CVNouhailaElkante.pdf"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#b58742] text-black text-sm font-semibold rounded-full hover:bg-[#c99a50] transition-all duration-300 hover:shadow-lg hover:shadow-[#b58742]/25"
              >
                Download CV
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  