import { useState } from "react";
import type { Project } from "../types/project";

interface Props {
  onSubmit: (project: Project) => void;
}

export const ProjectForm = ({ onSubmit }: Props) => {
  const [form, setForm] = useState({ title: "", description: "", image: "", github: "", demo: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    setForm({ title: "", description: "", image: "", github: "", demo: "" });
  };

  const inputClass = (name: string) =>
    `w-full bg-[#1a1a1a] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 ${
      focused === name
        ? "border-[#b58742] shadow-sm shadow-[#b58742]/20"
        : "border-white/10 hover:border-white/20"
    }`;

  const fields = [
    { name: "title", placeholder: "Project Title", type: "input" },
    { name: "description", placeholder: "Short Description", type: "textarea" },
    { name: "image", placeholder: "Image URL", type: "input" },
    { name: "github", placeholder: "GitHub URL", type: "input" },
    { name: "demo", placeholder: "Live Demo URL", type: "input" },
  ];

  return (
    <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
      <h3 className="text-white font-semibold text-lg mb-1">Add New Project</h3>
      <p className="text-gray-500 text-sm mb-6">Fill in the details to showcase your work.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map(({ name, placeholder, type }) =>
          type === "textarea" ? (
            <textarea
              key={name}
              name={name}
              value={(form as Record<string, string>)[name]}
              onChange={handleChange}
              placeholder={placeholder}
              rows={3}
              className={`${inputClass(name)} resize-none`}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused(null)}
            />
          ) : (
            <input
              key={name}
              type="text"
              name={name}
              value={(form as Record<string, string>)[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={inputClass(name)}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused(null)}
            />
          )
        )}

        <button
          type="submit"
          className="mt-2 w-full py-3 bg-[#b58742] text-black font-semibold text-sm rounded-xl hover:bg-[#c99a50] hover:shadow-lg hover:shadow-[#b58742]/25 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </form>
    </div>
  );
};
