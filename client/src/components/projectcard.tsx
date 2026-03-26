// src/components/Projects.tsx
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { SiVercel } from "react-icons/si";

/* ─── Types ─── */
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  vercel?:string | null;
  github?: string | null;
  demo?: string | null;
  featured: boolean;
}

/* ─── Data ─── */
const allProjects: Project[] = [
  {
    id: 1,
    title: "Luxury Touch – Furniture Website",
    description:
      "Designed and developed a modern furniture website using Next.js, focusing on elegant UI/UX and responsive design. The platform showcases home décor products with smooth navigation and a scalable component-based architecture.",    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    tags: ["Next.js", "React", "Tailwind CSS", "UI/UX"],
    category: "Frontend",
    github: "https://github.com/ElkanteNouhaila/furniture-next", 
    vercel:"https://furniture-next-theta.vercel.app/",
    demo: null, 
    featured: true,
  },
  {
    id: 2,
    title: "AI Customer Support Chatbot",
    description:
      "Developed an AI-powered chatbot for Marjane Mall using Flask and NLP. Implemented intent classification to handle user queries such as product prices and availability, with a modular design allowing future integration with a SQL database.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80",
    tags: ["Python", "Flask", "NLP", "TensorFlow"],
    category: "AI",
    github: "https://github.com/ElkanteNouhaila/ChatbotMarjaneMall", 
    vercel:"https://portfolio-cms-kwfv.vercel.app/",
    demo: "/videos/chatbotMM-demo.mp4",
    featured: true,
  },
];

const categories = ["All", "AI", "Frontend", "Fullstack"];

const tagColors: Record<string, string> = {
  React: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  TypeScript: "bg-blue-600/10 text-blue-300 border-blue-600/20",
  "Tailwind CSS": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Flask: "bg-green-500/10 text-green-400 border-green-500/20",
  "SQL Server": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Python: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  TensorFlow: "bg-orange-400/10 text-orange-300 border-orange-400/20",
  NLP: "bg-[#b58742]/10 text-[#b58742] border-[#b58742]/20",
  "Scikit-learn": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "REST API": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Chart.js": "bg-red-500/10 text-red-400 border-red-500/20",
};

/* ─── Projects Component ─── */
const Projects = () => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === active);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section className="py-24 bg-[#0a0a0a] text-white px-6" id="projects">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <p className="text-[#b58742] text-xs font-semibold tracking-widest text-center uppercase mb-3">
          What I've Built
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="text-[#b58742]">Projects</span>
        </h2>
        <p className="text-gray-500 text-center max-w-md mx-auto mb-10">
          A selection of things I've designed, built, and shipped.
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                active === cat
                  ? "bg-[#b58742] text-black border-[#b58742] shadow-lg shadow-[#b58742]/20"
                  : "text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  active === cat ? "bg-black/20 text-black" : "bg-white/5 text-gray-500"
                }`}
              >
                {cat === "All"
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {featured.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Regular Projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project) => (
            <RegularCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Featured Card ─── */
const FeaturedCard = ({ project }: { project: Project }) => (
  <div className="group relative bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#b58742]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#b58742]/10">
    <div className="relative overflow-hidden h-56">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#b58742] text-black text-xs font-bold rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
        Featured
      </div>
      <span className="absolute top-4 right-4 text-white/10 font-black text-5xl leading-none select-none">
        {String(project.id).padStart(2, "0")}
      </span>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white group-hover:text-[#b58742] transition-colors mb-2">
        {project.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5 ">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
              tagColors[tag] ?? "bg-white/5 text-gray-400 border-white/10"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200"
          >
            <FaGithub size={14} /> GitHub
          </a>
        )}
        {project.vercel && (
          <a
            href={project.vercel}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200"
          >
            <SiVercel size={14} /> Vercel
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="ml-auto flex items-center gap-2 text-xs font-semibold text-[#b58742] hover:text-black bg-[#b58742]/10 hover:bg-[#b58742] px-4 py-1.5 rounded-lg transition-all duration-300"
          >
            Live Demo <HiArrowUpRight size={12} />
          </a>
        )}
      </div>
    </div>
  </div>
);

/* ─── Regular Card ─── */
const RegularCard = ({ project }: { project: Project }) => (
  <div className="group bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-[#b58742]/25 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#b58742]/5 flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <span className="text-[#b58742]/30 font-black text-3xl leading-none select-none">
        {String(project.id).padStart(2, "0")}
      </span>
      <div className="flex gap-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <FaGithub size={14} />
          </a>
        )}
        {project.vercel && (
          <a
            href={project.vercel}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <SiVercel size={14} />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#b58742]/10 text-[#b58742] hover:bg-[#b58742] hover:text-black transition-all"
          >
            <HiArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
    <div>
      <h3 className="text-sm font-semibold text-white group-hover:text-[#b58742] transition-colors mb-1.5">
        {project.title}
      </h3>
      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
        {project.description}
      </p>
    </div>
    <div className="flex flex-wrap gap-1.5 mt-auto">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
            tagColors[tag] ?? "bg-white/5 text-gray-400 border-white/10"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default Projects;