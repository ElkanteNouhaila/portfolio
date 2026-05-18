import { useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  tags: string[];
  featured: boolean;
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accent = "#b58742";

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("portfolio-projects", JSON.stringify(projects));
  }, [projects]);

  const [form, setForm] = useState<Project>({
    id: "",
    title: "",
    description: "",
    image: null,
    category: "AI",
    tags: [],
    featured: false,
  });

  const resetForm = () => {
    setForm({
      id: "",
      title: "",
      description: "",
      image: null,
      category: "AI",
      tags: [],
      featured: false,
    });
  };

  const handleSave = () => {
    if (!form.title || !form.description) return;

    if (editingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...form, id: editingId } : p
        )
      );
      setEditingId(null);
    } else {
      setProjects((prev) => [
        ...prev,
        { ...form, id: crypto.randomUUID() },
      ]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setForm(project);
    setEditingId(project.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">

      {/* SIDEBAR */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-[#111111] border-r border-white/10 flex-col justify-between">

        <div className="p-6">

          {/* LOGO */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold" style={{ color: accent }}>
              Nouhaila
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Portfolio CMS
            </p>
          </div>

          {/* NAV */}
          <nav className="flex flex-col gap-3">

            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#b58742]/10 border border-[#b58742]/20 text-[#b58742]">
              <span className="w-2 h-2 rounded-full bg-[#b58742]" />
              Projects
            </button>

            <button className="px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white">
              Messages
            </button>

            <button className="px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white">
              Settings
            </button>

          </nav>
        </div>

        {/* STATUS */}
        <div className="p-6 border-t border-white/10">

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="text-sm text-gray-400">Status</p>

            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Online</span>
            </div>
          </div>

        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col md:ml-72">

        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/10">

          <div className="flex items-center justify-between px-6 py-4">

            <div>
              <h1 className="text-xl font-semibold">
                Portfolio Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Manage your projects
              </p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-2xl font-medium hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              + Add Project
            </button>

          </div>

        </header>

        {/* CONTENT */}
        <main className="p-6 md:p-8">

          {/* GRID */}
          <section>

            {projects.length === 0 && (
              <div className="bg-[#111111] border border-dashed border-white/10 rounded-3xl p-16 text-center text-gray-500">
                No projects yet. Click “Add Project” to create your first portfolio item.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-[#b58742]/40 hover:-translate-y-1 transition-all duration-300"
                >

                  {/* IMAGE */}
                  {p.image && (
                    <img
                      src={p.image}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-5">

                    {/* HEADER */}
                    <div className="flex justify-between mb-2">

                      <span className="text-xs text-gray-500 uppercase">
                        {p.category}
                      </span>

                      {p.featured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[#b58742]/10 text-[#b58742] border border-[#b58742]/20">
                          Featured
                        </span>
                      )}

                    </div>

                    {/* TITLE */}
                    <h3 className="text-lg font-semibold mb-2" style={{ color: accent }}>
                      {p.title}
                    </h3>

                    {/* DESC */}
                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                      {p.description}
                    </p>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3">

                      <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 py-2 rounded-xl border border-white/10 hover:border-white/30"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex-1 py-2 rounded-xl border border-red-500/20 text-red-400 hover:border-red-500/50"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          </section>

        </main>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-white/10 rounded-3xl p-6 relative">

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-6" style={{ color: accent }}>
              {editingId ? "Edit Project" : "Add Project"}
            </h3>

            <div className="flex flex-col gap-4">

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-black/40 p-3 rounded-xl border border-white/10"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-black/40 p-3 rounded-xl border border-white/10 resize-none"
                rows={5}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setForm({
                      ...form,
                      image: URL.createObjectURL(file),
                    });
                  }
                }}
                className="bg-black/40 p-3 rounded-xl border border-white/10"
              />

              {form.image && (
                <img
                  src={form.image}
                  className="w-full h-52 object-cover rounded-xl border border-white/10"
                />
              )}

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="bg-black/40 p-3 rounded-xl border border-white/10"
              >
                <option value="AI">AI</option>
                <option value="Fullstack">Fullstack</option>
              </select>

              <input
                value={form.tags.join(", ")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Tags"
                className="bg-black/40 p-3 rounded-xl border border-white/10"
              />

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                />
                Featured
              </label>

              <button
                onClick={handleSave}
                className="py-3 rounded-xl font-semibold"
                style={{ backgroundColor: accent }}
              >
                {editingId ? "Update" : "Create"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}