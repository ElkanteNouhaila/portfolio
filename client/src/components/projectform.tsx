import { useState } from "react";

interface Props {
  onSuccess?: () => void; // optional refresh trigger
}

export const ProjectForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    demo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    try {
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

      onSuccess?.(); // refresh projects if needed
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const inputClass =
    "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 hover:border-white/20";

  return (
    <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
      <h3 className="text-white font-semibold text-lg mb-1">
        Add New Project
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" value={form.title} onChange={handleChange} className={inputClass} placeholder="Title" />
        <textarea name="description" value={form.description} onChange={handleChange} className={inputClass} placeholder="Description" />
        <input name="image" value={form.image} onChange={handleChange} className={inputClass} placeholder="Image URL" />
        <input name="github" value={form.github} onChange={handleChange} className={inputClass} placeholder="GitHub" />
        <input name="demo" value={form.demo} onChange={handleChange} className={inputClass} placeholder="Demo" />

        <button className="bg-[#b58742] text-black py-3 rounded-xl">
          Add Project
        </button>
      </form>
    </div>
  );
};