import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import type { Project } from "../types/project";
import { useAuthLogic } from "../context/useAuthLogic";
import { apiFetch } from "../lib/api";
import { Link } from "react-router-dom";

type ProjectForm = {
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
  github: string;
  vercel: string;
  demo: string;
};


export default function AdminDashboard() {
  const { user, logout } = useAuthLogic();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const accent = "#b58742";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiFetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  
  const [form, setForm] = useState<ProjectForm>({
    title: "",
    description: "",
    image: "",
    category: "AI",
    tags: [],
    featured: false,
    github: "",
    vercel: "",
    demo: "",
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      category: "AI",
      tags: [],
      featured: false,
      github: "",
      vercel: "",
      demo: "",
    });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setSaveError("Title and description are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image,
      category: form.category,
      tags: form.tags,
      featured: form.featured,
      github: form.github.trim(),
      vercel: form.vercel.trim(),
      demo: form.demo.trim() || null,
    };

    setIsSaving(true);
    setSaveError(null);

    try {
      const path = editingId
        ? `/api/projects/${editingId}`
        : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await apiFetch(path, {
        method,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }

      if (!res.ok) {
        setSaveError(data.message || "Failed to save project.");
        return;
      }

      if (editingId) {
        setProjects((prev) =>
          prev.map((p) =>
            String(p._id) === String(editingId) ? (data as Project) : p
          )
        );
      } else {
        setProjects((prev) => [...prev, data as Project]);
      }

      setIsModalOpen(false);
      setEditingId(null);
      resetForm();
    } catch (err) {
      console.error("Save error:", err);
      setSaveError("Could not reach the server. Is the backend running?");
    } finally {
      setIsSaving(false);
    }
  };


  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      image: project.image || "",
      category: project.category,
      tags: project.tags ?? [],
      featured: project.featured,
      github: project.github ?? "",
      vercel: project.vercel ?? "",
      demo: project.demo ?? "",
    });

    setEditingId(String(project._id));
    setSaveError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setSaveError(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    const res = await apiFetch(`/api/projects/${id}`, { method: "DELETE" });

    if (res.status === 401) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    if (!res.ok) return;

    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">

      {/* SIDEBAR */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-[#111111] border-r border-white/10 flex-col justify-between">

        <div className="p-6">

          <div className="mb-12">
            <h1 className="text-3xl font-bold" style={{ color: accent }}>
              Nouhaila
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Portfolio CMS
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#b58742]/10 border border-[#b58742]/20 text-[#b58742]">
              Projects
            </Link>

            <Link to="/dashboard/messages" className="px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white">
              Messages
            </Link>

            <Link to="/dashboard/settings" className="px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white">
              Settings
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="mb-4 rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="mt-1 truncate text-sm text-white">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm text-gray-400 transition hover:border-red-500/30 hover:text-red-400"
          >
            <FiLogOut size={16} />
            Log out
          </button>
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
                setSaveError(null);
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

          <section>
            {projects.length === 0 && (
              <div className="bg-[#111111] border border-dashed border-white/10 rounded-3xl p-16 text-center text-gray-500">
                No projects yet. Click “Add Project” to create your first portfolio item.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {projects.map((p) => (
                <div
                  key={p._id}
                  className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-[#b58742]/40 hover:-translate-y-1 transition-all duration-300"
                >

                  {p.image && (
                    <img
                      src={p.image}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-5">

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

                    <h3 className="text-lg font-semibold mb-2" style={{ color: accent }}>
                      {p.title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                      {p.description}
                    </p>

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

                    <div className="flex gap-3">

                      <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 py-2 rounded-xl border border-white/10 hover:border-white/30"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
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
              type="button"
              onClick={closeModal}
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

              <div className="flex flex-col gap-3">

                <label className="text-sm text-gray-400">
                  Project Image
                </label>

                <label className="cursor-pointer px-4 py-3 rounded-xl border border-white/10 bg-black/40 hover:border-[#b58742] transition text-sm text-gray-300 w-fit">
                  Choose Image

                  <input
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  }}
/>
                </label>

              </div>

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
                placeholder="Tags (comma separated)"
                className="bg-black/40 p-3 rounded-xl border border-white/10"
              />

              <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-medium text-gray-300">Links</p>

                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={form.github}
                  onChange={(e) =>
                    setForm({ ...form, github: e.target.value })
                  }
                  className="bg-black/40 p-3 rounded-xl border border-white/10 text-sm"
                />

                <input
                  type="url"
                  placeholder="Vercel URL"
                  value={form.vercel}
                  onChange={(e) =>
                    setForm({ ...form, vercel: e.target.value })
                  }
                  className="bg-black/40 p-3 rounded-xl border border-white/10 text-sm"
                />

                <input
                  type="url"
                  placeholder="Demo URL (live demo or video)"
                  value={form.demo}
                  onChange={(e) =>
                    setForm({ ...form, demo: e.target.value })
                  }
                  className="bg-black/40 p-3 rounded-xl border border-white/10 text-sm"
                />
              </div>

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

              {saveError && (
                <p className="text-sm text-red-400">{saveError}</p>
              )}

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="py-3 rounded-xl font-semibold disabled:opacity-50"
                style={{ backgroundColor: accent }}
              >
                {isSaving
                  ? "Saving..."
                  : editingId
                    ? "Update"
                    : "Create"}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
