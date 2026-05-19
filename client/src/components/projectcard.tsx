import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight, HiSparkles } from "react-icons/hi2";
import { SiVercel } from "react-icons/si";
import { FiFolder, FiExternalLink } from "react-icons/fi";
import type { Project } from "../types/project";

type Props = {
  project: Project;
  variant?: "default" | "featured";
  index?: number;
};

const MAX_TAGS = 4;

const ProjectCard = ({ project, variant = "default", index }: Props) => {
  const isFeatured = variant === "featured";
  const visibleTags = project.tags?.slice(0, MAX_TAGS) ?? [];
  const extraTags = (project.tags?.length ?? 0) - MAX_TAGS;
  const hasLinks = project.github || project.vercel || project.demo;

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border bg-[#111111] transition-all duration-500 hover:border-[#b58742]/35 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] ${
        isFeatured
          ? "border-[#b58742]/25 shadow-[0_0_0_1px_rgba(181,135,66,0.08)] lg:flex lg:min-h-[320px]"
          : "border-white/10 hover:-translate-y-1"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b58742]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className={`relative overflow-hidden bg-black/40 ${
          isFeatured
            ? "h-56 lg:h-auto lg:w-[45%] lg:shrink-0"
            : "h-52"
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full min-h-[208px] items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#111111]">
            <FiFolder size={36} className="text-[#b58742]/40" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />

        {index !== undefined && (
          <span className="absolute right-4 top-4 font-mono text-xs text-white/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {project.category && (
            <span className="rounded-full border border-[#b58742]/25 bg-[#b58742]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#b58742] backdrop-blur-md">
              {project.category}
            </span>
          )}
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#e2b96f]/30 bg-[#b58742]/20 px-3 py-1 text-[11px] font-medium text-[#e2b96f] backdrop-blur-md">
              <HiSparkles size={12} />
              Featured
            </span>
          )}
        </div>

        {hasLinks && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-[#b58742] hover:bg-[#b58742] hover:text-black"
                aria-label="Live demo"
              >
                <FiExternalLink size={18} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-[#b58742] hover:bg-[#b58742] hover:text-black"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.vercel && (
              <a
                href={project.vercel}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-[#b58742] hover:bg-[#b58742] hover:text-black"
                aria-label="Vercel"
              >
                <SiVercel size={16} />
              </a>
            )}
          </div>
        )}
      </div>

      <div className={`flex flex-col p-6 ${isFeatured ? "lg:flex-1 lg:justify-center" : ""}`}>
        <h3
          className={`font-semibold text-white transition-colors duration-300 group-hover:text-[#b58742] ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`mt-3 text-gray-400 ${
            isFeatured
              ? "line-clamp-4 text-sm leading-7 md:text-base"
              : "line-clamp-3 min-h-[4.5rem] text-sm leading-6"
          }`}
        >
          {project.description}
        </p>

        {visibleTags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-xs text-gray-400 transition-colors group-hover:border-[#b58742]/15 group-hover:text-gray-300"
              >
                {tag}
              </span>
            ))}
            {extraTags > 0 && (
              <span className="rounded-lg px-2.5 py-1 text-xs text-[#b58742]/80">
                +{extraTags}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-5">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition hover:border-[#b58742]/30 hover:text-[#b58742]"
                aria-label="GitHub repository"
              >
                <FaGithub size={15} />
              </a>
            )}
            {project.vercel && (
              <a
                href={project.vercel}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition hover:border-[#b58742]/30 hover:text-[#b58742]"
                aria-label="Vercel deployment"
              >
                <SiVercel size={14} />
              </a>
            )}
          </div>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#b58742] to-[#c9a05a] px-4 py-2 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(181,135,66,0.25)] transition hover:shadow-[0_6px_28px_rgba(181,135,66,0.35)]"
            >
              View project
              <HiArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
