import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Project>({
    id: "",
    title: "",
    description: "",
    image: "",
  });

  const accent = "#b58742";

  const handleSave = () => {
    if (!form.title) return;

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

    setForm({ id: "", title: "", description: "", image: "" });
  };

  const handleEdit = (p: Project) => {
    setForm(p);
    setEditingId(p.id);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-white/10 p-6">
        <h1 className="text-xl font-bold mb-8" style={{ color: accent }}>
          Admin Panel
        </h1>

        
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* Sticky Navbar */}
        <header className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur border-b border-white/10 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Portfolio Admin Dashboard
            </h2>

            <div className="text-sm text-gray-400">
              Welcome back 👋
            </div>
          </div>
        </header>

        {/* Content UNDER navbar */}
        <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - FORM */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-5" style={{ color: accent }}>
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>

            <div className="flex flex-col gap-3">
              <input
                className="bg-black/40 border border-white/10 p-3 rounded-lg outline-none focus:border-[#b58742]"
                placeholder="Project title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                className="bg-black/40 border border-white/10 p-3 rounded-lg outline-none focus:border-[#b58742]"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                className="bg-black/40 border border-white/10 p-3 rounded-lg outline-none focus:border-[#b58742]"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />

              <button
                onClick={handleSave}
                className="mt-2 py-3 rounded-lg font-semibold transition hover:opacity-90"
                style={{ backgroundColor: accent }}
              >
                {editingId ? "Update Project" : "Add Project"}
              </button>
            </div>
          </div>

          {/* RIGHT - PROJECTS LIST */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">

            {projects.length === 0 && (
              <div className="text-gray-500 col-span-2 text-center py-10">
                No projects yet. Start by adding one 👈
              </div>
            )}

            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#b58742]/50 transition"
              >
                {p.image && (
                  <img
                    src={p.image}
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="font-semibold mb-1" style={{ color: accent }}>
                    {p.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4">
                    {p.description}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 text-sm border border-white/20 rounded-lg hover:border-white/40"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 text-sm border border-red-500/30 text-red-400 rounded-lg hover:border-red-500/60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </main>
      </div>
    </div>
  );
}