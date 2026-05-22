import { useEffect, useState, type ReactNode } from "react";
import ProjectCard from "./projectcard";
import type { Project } from "../../types/project";
import { API_URL } from "../../lib/api";
import {
  FiFolder,
  FiRefreshCcw,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const categories = ["All", "AI", "Fullstack"] as const;

const categoryIcons: Record<string, ReactNode> = {
  All: <FiLayers size={14} />,
  AI: <FiCpu size={14} />,
  Fullstack: <FiFolder size={14} />,
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/projects`);
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

  const featuredInView = filtered.filter((p) => p.featured);
  const spotlight =
    active === "All" && featuredInView.length > 0
      ? featuredInView[0]
      : null;
  const gridProjects = spotlight
    ? filtered.filter((p) => p._id !== spotlight._id)
    : filtered;

  return (
    <section
      className="relative overflow-hidden bg-[#0f0f0f] px-6 py-28 text-white"
      id="projects"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#b58742 1px, transparent 1px), linear-gradient(to right, #b58742 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#b58742]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-[#b58742]/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#b58742]">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Selected{" "}
            <span className="bg-gradient-to-r from-[#b58742] to-[#e2b96f] bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
            AI systems, full-stack applications, and products built with a focus
            on clarity, performance, and craft.
          </p>
        </div>

        <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-white/8 bg-[#111111]/60 p-1.5 backdrop-blur-sm">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    active === cat
                      ? "bg-[#b58742] text-black shadow-[0_4px_20px_rgba(181,135,66,0.3)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {categoryIcons[cat]}
                  {cat}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                      active === cat
                        ? "bg-black/20 text-black"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={fetchProjects}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-400 transition hover:border-[#b58742]/30 hover:text-[#b58742] disabled:opacity-40"
          >
            <FiRefreshCcw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="space-y-8">
            <div className="h-80 animate-pulse rounded-3xl border border-white/10 bg-[#111111]" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-4 animate-pulse"
                >
                  <div className="mb-4 h-48 rounded-2xl bg-white/5" />
                  <div className="mb-3 h-5 w-2/3 rounded bg-white/5" />
                  <div className="mb-4 h-4 w-full rounded bg-white/5" />
                  <div className="flex gap-2">
                    <div className="h-7 w-14 rounded-lg bg-white/5" />
                    <div className="h-7 w-14 rounded-lg bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-[#111111]/50 px-6 py-24 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b58742]/10 text-[#b58742]">
              <FiFolder size={26} />
            </div>
            <h3 className="text-xl font-semibold">No projects yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              {active === "All"
                ? "Add projects from your dashboard to showcase them here."
                : `No ${active} projects in this category.`}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {spotlight && (
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <HiSparkles className="text-[#b58742]" size={18} />
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#b58742]">
                    Spotlight
                  </h3>
                </div>
                <ProjectCard
                  project={spotlight}
                  variant="featured"
                  index={filtered.findIndex((p) => p._id === spotlight._id)}
                />
              </div>
            )}

            {gridProjects.length > 0 && (
              <div>
                {spotlight && (
                  <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-gray-500">
                    More projects
                  </h3>
                )}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {gridProjects.map((project, i) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={
                        spotlight
                          ? i
                          : filtered.findIndex((p) => p._id === project._id)
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
