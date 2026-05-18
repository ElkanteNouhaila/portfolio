// // src/components/Projects.tsx
// import { useEffect, useState } from "react";
// import { FaGithub } from "react-icons/fa";
// import { HiArrowUpRight } from "react-icons/hi2";
// import { SiVercel } from "react-icons/si";
// import type { Project } from "../data/projects";

// const categories = ["All", "AI", "Fullstack"];

// const Projects = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [active, setActive] = useState("All");

//   // Load from localStorage (shared with dashboard)
//   useEffect(() => {
//     const saved = localStorage.getItem("portfolio-projects");
//     if (saved) {
//       setProjects(JSON.parse(saved));
//     }
//   }, []);

//   const filtered =
//     active === "All"
//       ? projects
//       : projects.filter((p) => p.category === active);

//   const featured = filtered.filter((p) => p.featured);
//   const rest = filtered.filter((p) => !p.featured);

//   return (
//     <section className="py-24 bg-[#0a0a0a] text-white px-6" id="projects">
//       <div className="max-w-6xl mx-auto">

//         {/* Header */}
//         <p className="text-[#b58742] text-xs font-semibold tracking-widest text-center uppercase mb-3">
//           What I've Built
//         </p>

//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
//           My <span className="text-[#b58742]">Projects</span>
//         </h2>

//         <p className="text-gray-500 text-center max-w-md mx-auto mb-10">
//           A selection of things I've designed, built, and shipped.
//         </p>

//         {/* Filter Tabs */}
//         <div className="flex justify-center gap-2 flex-wrap mb-14">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActive(cat)}
//               className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
//                 active === cat
//                   ? "bg-[#b58742] text-black border-[#b58742]"
//                   : "text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
//               }`}
//             >
//               {cat}
//               <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400">
//                 {cat === "All"
//                   ? projects.length
//                   : projects.filter((p) => p.category === cat).length}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Featured */}
//         {featured.length > 0 && (
//           <div className="grid md:grid-cols-2 gap-6 mb-6">
//             {featured.map((project) => (
//               <FeaturedCard key={project.id} project={project} />
//             ))}
//           </div>
//         )}

//         {/* Regular */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {rest.map((project) => (
//             <RegularCard key={project.id} project={project} />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// /* ─── Featured Card ─── */
// const FeaturedCard = ({ project }: { project: Project }) => (
//   <div className="group relative bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#b58742]/30 transition-all duration-500">

//     <div className="relative overflow-hidden h-56">
//       {project.image && (
//         <img
//           src={project.image}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//         />
//       )}

//       <div className="absolute top-4 left-4 px-3 py-1 bg-[#b58742] text-black text-xs font-bold rounded-full">
//         Featured
//       </div>
//     </div>

//     <div className="p-6">
//       <h3 className="text-lg font-semibold text-white mb-2">
//         {project.title}
//       </h3>

//       <p className="text-gray-500 text-sm mb-5">
//         {project.description}
//       </p>

//       <div className="flex gap-3">
//         {project.github && (
//           <a href={project.github} className="text-gray-400">
//             <FaGithub />
//           </a>
//         )}

//         {project.vercel && (
//           <a href={project.vercel} className="text-gray-400">
//             <SiVercel />
//           </a>
//         )}

//         {project.demo && (
//           <a href={project.demo} className="text-[#b58742] ml-auto">
//             <HiArrowUpRight />
//           </a>
//         )}
//       </div>
//     </div>
//   </div>
// );

// /* ─── Regular Card ─── */
// const RegularCard = ({ project }: { project: Project }) => (
//   <div className="bg-[#111111] border border-white/5 rounded-2xl p-5">
//     <h3 className="text-white font-semibold mb-2">
//       {project.title}
//     </h3>

//     <p className="text-gray-500 text-xs">
//       {project.description}
//     </p>
//   </div>
// );

// export default Projects;


// src/components/Projects.tsx
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { SiVercel } from "react-icons/si";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  github?: string;
  vercel?: string;
  demo?: string;
};

const categories = ["All", "AI", "Fullstack"];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState("All");

  // LOAD (safe parsing)
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-projects");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setProjects(parsed);
      }
    } catch (err) {
      console.error("Invalid localStorage data", err);
      setProjects([]);
    }
  }, []);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section className="py-24 bg-[#0a0a0a] text-white px-6" id="projects">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center mb-10">
          My <span className="text-[#b58742]">Projects</span>
        </h2>

        {/* FILTERS */}
        <div className="flex justify-center gap-2 flex-wrap mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm rounded-full border transition ${
                active === cat
                  ? "bg-[#b58742] text-black border-[#b58742]"
                  : "text-gray-400 border-white/10 hover:text-white"
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-70">
                {cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* FEATURED */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {featured.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* NORMAL */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project) => (
            <RegularCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;

/* ───────── FEATURED CARD ───────── */
const FeaturedCard = ({ project }: { project: Project }) => (
  <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#b58742]/30 transition">

    {project.image && (
      <img
        src={project.image}
        className="w-full h-56 object-cover"
        alt={project.title}
      />
    )}

    <div className="p-6">

      <div className="flex justify-between mb-2">
        <span className="text-xs text-[#b58742]">Featured</span>
        <span className="text-xs text-gray-500 uppercase">
          {project.category}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-white">
        {project.title}
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        {project.description}
      </p>

      <div className="flex gap-3 items-center">

        {project.github && (
          <a href={project.github} target="_blank">
            <FaGithub />
          </a>
        )}

        {project.vercel && (
          <a href={project.vercel} target="_blank">
            <SiVercel />
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            className="ml-auto text-[#b58742]"
          >
            <HiArrowUpRight />
          </a>
        )}

      </div>
    </div>
  </div>
);

/* ───────── REGULAR CARD ───────── */
const RegularCard = ({ project }: { project: Project }) => (
  <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 hover:border-[#b58742]/30 transition">

    <h3 className="text-white font-semibold mb-2">
      {project.title}
    </h3>

    <p className="text-gray-500 text-xs">
      {project.description}
    </p>

  </div>
);