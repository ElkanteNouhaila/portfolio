import { useState } from "react";
import {
  FaReact,
  FaHtml5,
  FaGitAlt,
  FaDocker,
  FaDatabase,
   
} from "react-icons/fa";



import {
  SiPython, 
  SiExpress,
  SiNextdotjs ,
  SiTypescript,
  SiTailwindcss,
  SiFlask,
  SiTensorflow,
  SiScikitlearn,
  SiPostman,
  SiVercel, 
  SiRender,
} from "react-icons/si";

import { BsCodeSlash } from "react-icons/bs";

const skillsData = [
  {
    category: "Frontend",
    icon: <BsCodeSlash />,
    description: "Building modern, responsive, and accessible user interfaces.",
    skills: [
      { name: "React", level: 90, icon: <FaReact /> },
      { name: "Next.js", level: 88, icon: <SiNextdotjs /> },
      { name: "TypeScript", level: 85, icon: <SiTypescript /> },
      { name: "Tailwind CSS", level: 92, icon: <SiTailwindcss /> },
      { name: "HTML & CSS", level: 95, icon: <FaHtml5 /> },
    ],
  },
  {
    category: "Backend",
    icon: <BsCodeSlash />,
    description: "Designing robust APIs and managing relational databases.",
    skills: [
      { name: "Python", level: 85, icon: <SiPython /> },       
      { name: "Flask", level: 82, icon: <SiFlask /> },
      { name: "Express.js", level: 80, icon: <SiExpress /> },
      { name: "SQL Server", level: 75, icon: <FaDatabase  /> },
      { name: "REST APIs", level: 85, icon: <BsCodeSlash /> },
      { name: "JWT Auth", level: 78, icon: <BsCodeSlash /> },
    ],
  },
  {
    category: "AI",
    icon: <BsCodeSlash />,
    description: "Training and deploying intelligent language models.",
    skills: [
      { name: "Machine Learning", level: 85, icon: <SiScikitlearn /> },
      { name: "Deep Learning", level: 82, icon: <SiTensorflow /> },
      { name: "TensorFlow", level: 75, icon: <SiTensorflow /> },
      { name: "NLP", level: 88, icon: <BsCodeSlash /> },
      { name: "Intent Classification", level: 85, icon: <BsCodeSlash /> },
    ],
  },
];

const tools = [
  { name: "VS Code", icon: <BsCodeSlash /> },
  { name: "Git & GitHub", icon: <FaGitAlt /> },
  { name: "Postman", icon: <SiPostman /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Render", icon: <SiRender /> },
  { name: "Cursor", icon: < SiRender /> },
];

const getLevelLabel = (level: number) => {
  if (level >= 90) return { label: "Expert", color: "text-emerald-400" };
  if (level >= 80) return { label: "Advanced", color: "text-blue-400" };
  if (level >= 70) return { label: "Proficient", color: "text-[#b58742]" };
  return { label: "Learning", color: "text-purple-400" };
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = skillsData[activeTab];

  return (
    <section className="py-24 bg-[#0f0f0f] text-white px-6" id="skills">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <p className="text-[#b58742] text-xs font-semibold tracking-widest text-center uppercase mb-3">
          Expertise
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="text-[#b58742]">Skills</span>
        </h2>
        <p className="text-gray-500 text-center max-w-md mx-auto mb-14">
          Technologies I use to turn ideas into real, working products.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {skillsData.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                activeTab === idx
                  ? "bg-[#b58742]/10 border-[#b58742]/40 text-[#b58742]"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.category}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">

          {/* Left */}
          <div className="md:col-span-2 bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-4 text-[#b58742]">{current.icon}</div>
              <h3 className="text-xl font-bold mb-2">{current.category}</h3>
              <p className="text-gray-500 text-sm mb-6">{current.description}</p>
            </div>

            {/* Average */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Average Proficiency</span>
                <span className="text-[#b58742] font-semibold">
                  {Math.round(
                    current.skills.reduce((s, sk) => s + sk.level, 0) /
                      current.skills.length
                  )}
                  %
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#b58742] to-[#e2b96f]"
                  style={{
                    width: `${Math.round(
                      current.skills.reduce((s, sk) => s + sk.level, 0) /
                        current.skills.length
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-3 bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
            {current.skills.map((skill, i) => {
              const { label, color } = getLevelLabel(skill.level);
              return (
                <div key={i} className="group">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-[#b58742] group-hover:scale-110 transition">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className={`text-xs font-semibold ${color}`}>
                        {label}
                      </span>
                      <span className="text-xs text-gray-500 w-8 text-right">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`,
                        background:
                          "linear-gradient(90deg, #b58742 0%, #e2b96f 100%)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl px-6 py-5">
          <p className="text-xs text-gray-600 uppercase mb-4">
            Tools & Environment
          </p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-gray-400 hover:text-[#b58742] hover:bg-[#b58742]/10 transition"
              >
                <span className="text-lg">{tool.icon}</span>
                {tool.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;