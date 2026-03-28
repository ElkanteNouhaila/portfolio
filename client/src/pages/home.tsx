import About from "../components/about";
import Contact from "../components/contact";
import Hero from "../components/hero";
import  ProjectCard  from "../components/projectcard";
import Skills from "../components/skills";

export const Home = () => {
  return (
    <>
      <Hero />   
      <About/>
      <Skills/>
      <ProjectCard/>
      <Contact/>
    </>
  );
};