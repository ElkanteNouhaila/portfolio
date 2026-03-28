// src/pages/Dashboard.tsx
import { useState } from "react";
import { allProjects } from "../data/projects";
import type { Project } from "../data/projects";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>(allProjects);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Add project
  const addProject = () => {
    if (!newTitle || !newDescription) return;

    const newProject: Project = {
      id: projects.length + 1,
      title: newTitle,
      description: newDescription,
      image: "https://via.placeholder.com/600x400", // placeholder image
      tags: [],
      category: "Fullstack",
      github: "",
      vercel: "",
      demo: null,
      featured: false,
    };

    setProjects([...projects, newProject]);
    setNewTitle("");
    setNewDescription("");
  };

  // Delete project
  const deleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="mb-6 text-gray-400">
          Add, edit, or delete your projects.
        </p>

        {/* Add Project */}
        <div className="mb-10 bg-[#111111] p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <input
            type="text"
            placeholder="Project Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-[#0f0f0f] border border-white/20 text-white"
          />
          <textarea
            placeholder="Project Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-[#0f0f0f] border border-white/20 text-white"
          />
          <button
            onClick={addProject}
            className="px-4 py-2 bg-[#b58742] rounded hover:bg-[#e2b96f] transition text-black font-medium"
          >
            Add Project
          </button>
        </div>

        {/* Project List */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111111] p-5 rounded-xl border border-white/10 flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => deleteProject(project.id)}
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 text-white text-sm transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => alert("Edit functionality coming soon!")}
                  className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 text-white text-sm transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>  
    </div>
  );
};

export default Dashboard;