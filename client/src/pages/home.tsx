import { useEffect, useState } from "react";

import About from "../components/about";
import Contact from "../components/contact";
import Hero from "../components/hero";
import ProjectCard from "../components/projectcard";
import Skills from "../components/skills";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  tags: string[];
  featured: boolean;
};

export const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-projects");
  
    if (!saved) return;
  
    try {
      const parsed = JSON.parse(saved);
      setProjects(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Invalid localStorage data", err);
      setProjects([]);
    }
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />

      {/* ✅ IMPORTANT: pass data here */}
      <ProjectCard projects={projects} />

      <Contact />
    </>
  );
};