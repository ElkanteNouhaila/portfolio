import { useState } from "react";
import {
  FiPlus,
  FiImage,
  FiGithub,
  FiExternalLink,
  FiFileText,
  FiType,
} from "react-icons/fi";

interface Props {
  onSuccess?: () => void;
}

export const ProjectForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    demo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      setIsSubmitting(true);

      await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          image: form.image,
          github: form.github,
          demo: form.demo,
          category: "AI",
          tags: [],
          featured: false,
        }),
      });

      setForm({
        title: "",
        description: "",
        image: "",
        github: "",
        demo: "",
      });

      onSuccess?.();
    } catch (err) {
      console.error("Error adding project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 hover:border-white/20 focus:border-[#b58742]/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(181,135,66,0.12)]";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      {/* top glow */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#b58742]/10 to-transparent pointer-events-none" />

      <div className="relative p-6 md:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#b58742]/20 bg-[#b58742]/10 px-3 py-1 text-xs font-medium text-[#b58742]">
              <FiPlus size={14} />
              New Entry
            </span>
            <h3 className="text-xl font-semibold text-white">
              Add New Project
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Create a clean and attractive portfolio item.
            </p>
          </div>

          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#b58742] md:flex">
            <FiFileText size={20} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.9fr]">
            {/* Left side */}
            <div className="space-y-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <FiType size={15} className="text-[#b58742]" />
                  Project Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="AI Customer Support Chatbot"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <FiFileText size={15} className="text-[#b58742]" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Write a short and powerful project description..."
                />
              </div>

              <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <FiImage size={15} className="text-[#b58742]" />
                Project Image
              </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const reader = new FileReader();

                      reader.onloadend = () => {
                        setForm({
                          ...form,
                          image: reader.result as string, // base64 string
                        });
                      };

                      reader.readAsDataURL(file);
                    }}
                  />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FiGithub size={15} className="text-[#b58742]" />
                    GitHub URL
                  </label>
                  <input
                    name="github"
                    value={form.github}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FiExternalLink size={15} className="text-[#b58742]" />
                    Demo URL
                  </label>
                  <input
                    name="demo"
                    value={form.demo}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://your-demo.com"
                  />
                </div>
              </div>
            </div>

            {/* Right preview */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-4">
              <p className="mb-3 text-sm font-medium text-gray-300">
                Live Preview
              </p>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                <div className="relative h-48 bg-black/30">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-600">
                      <div className="text-center">
                        <FiImage size={28} className="mx-auto mb-2" />
                        <p className="text-sm">Image preview</p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                </div>

                <div className="p-4">
                  <h4 className="mb-2 text-base font-semibold text-white">
                    {form.title || "Project title"}
                  </h4>
                  <p className="min-h-[60px] text-sm leading-6 text-gray-400">
                    {form.description || "Your project description will appear here."}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full border border-[#b58742]/20 bg-[#b58742]/10 px-3 py-1 text-xs text-[#b58742]">
                      AI
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                      Portfolio
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#b58742] px-4 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#c8974f] hover:shadow-[0_12px_30px_rgba(181,135,66,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiPlus size={16} />
            {isSubmitting ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};
