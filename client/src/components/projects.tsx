import { useEffect, useState } from "react";
import ProjectCard from "./projectcard";
import type { Project } from "../data/projects";

const categories = ["All", "AI", "Fullstack"];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-projects");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setProjects(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Invalid localStorage data", err);
      setProjects([]);
    }
  }, []);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section
      className="py-24 bg-[#0a0a0a] text-white px-6"
      id="projects"
    >
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

        {/* Filter */}
        <div className="flex justify-center gap-2 flex-wrap mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                active === cat
                  ? "bg-[#b58742] text-black border-[#b58742]"
                  : "text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}

              <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400">
                {cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;