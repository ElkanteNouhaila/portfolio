import { useEffect, useState } from "react";
import ProjectCard from "./projectcard";
import type { Project } from "../types/project";
import { FiFolder, FiGrid, FiRefreshCcw } from "react-icons/fi";

const categories = ["All", "AI", "Fullstack"];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-6 py-24 text-white" id="projects">
      {/* background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#b58742]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#b58742]/20 bg-[#b58742]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#b58742]">
            <FiFolder size={14} />
            Portfolio Showcase
          </span>

          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            My <span className="text-[#b58742]">Projects</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            A curated collection of projects focused on AI systems, full-stack
            products, and modern user experiences.
          </p>
        </div>

        {/* Top bar */}
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b58742]/10 text-[#b58742]">
              <FiGrid size={18} />
            </div>
            <div>
              <p className="font-medium text-white">Projects Library</p>
              <p>
                Showing <span className="text-[#b58742]">{filtered.length}</span>{" "}
                project{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active === cat
                      ? "border-[#b58742] bg-[#b58742] text-black shadow-[0_8px_24px_rgba(181,135,66,0.25)]"
                      : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                      active === cat
                        ? "bg-black/15 text-black"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
            >
              <FiRefreshCcw size={14} />
              Refresh
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-4 animate-pulse"
              >
                <div className="mb-4 h-48 rounded-2xl bg-white/5" />
                <div className="mb-3 h-5 w-2/3 rounded bg-white/5" />
                <div className="mb-2 h-4 w-full rounded bg-white/5" />
                <div className="mb-4 h-4 w-4/5 rounded bg-white/5" />
                <div className="flex gap-2">
                  <div className="h-7 w-16 rounded-full bg-white/5" />
                  <div className="h-7 w-16 rounded-full bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b58742]/10 text-[#b58742]">
              <FiFolder size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white">No projects found</h3>
            <p className="mt-2 text-sm text-gray-400">
              Try another category or add a new project from the dashboard.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
