import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { SiVercel } from "react-icons/si";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="group bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-[#b58742]/25 transition-all duration-300">

      {/* IMAGE */}
      {project.image && (
        <div className="overflow-hidden rounded-xl mb-4 h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* TITLE */}
      <h3 className="text-white font-semibold text-lg mb-2">
        {project.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-500 text-sm mb-5">
        {project.description}
      </p>

      {/* TAGS */}
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* LINKS */}
      <div className="flex items-center gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub size={18} />
          </a>
        )}

        {project.vercel && (
          <a
            href={project.vercel}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SiVercel size={18} />
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-[#b58742] hover:text-[#d4a157] transition-colors"
          >
            <HiArrowUpRight size={20} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;