import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { SiVercel } from "react-icons/si";
import { FiFolder } from "react-icons/fi";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#b58742]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-[#b58742]/10 blur-3xl" />
      </div>

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-black/30">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-600">
            <FiFolder size={28} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {project.category && (
            <span className="rounded-full border border-[#b58742]/20 bg-[#b58742]/10 px-3 py-1 text-xs font-medium text-[#b58742] backdrop-blur-md">
              {project.category}
            </span>
          )}

          {project.featured && (
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#b58742]">
            {project.title}
          </h3>
        </div>

        <p className="mb-5 min-h-[72px] text-sm leading-6 text-gray-400">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300 transition hover:border-[#b58742]/20 hover:text-[#b58742]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                <FaGithub size={16} />
              </a>
            )}

            {project.vercel && (
              <a
                href={project.vercel}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                <SiVercel size={15} />
              </a>
            )}
          </div>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#b58742]/10 px-4 py-2 text-sm font-medium text-[#b58742] transition-all duration-300 hover:bg-[#b58742] hover:text-black"
            >
              Live Demo
              <HiArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
