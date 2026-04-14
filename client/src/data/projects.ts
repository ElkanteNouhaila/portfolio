/* ─── Types ─── */
export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    vercel?:string | null;
    github?: string | null;
    demo?: string | null;
    featured: boolean;
  }
  
  /* ─── Data ─── */
  export const allProjects: Project[] = [
    {
      id: 1,
      title: "Luxury Touch – Furniture Website",
      description:
        "Designed and developed a modern furniture website using Next.js, focusing on elegant UI/UX and responsive design. The platform showcases home décor products with smooth navigation and a scalable component-based architecture.",    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
      tags: ["Next.js", "React", "Tailwind CSS", "UI/UX"],
      category: "Fullstack",
      github: "https://github.com/ElkanteNouhaila/furniture-next", 
      vercel:"https://furniture-next-theta.vercel.app/",
      demo: null, 
      featured: true,
    },
    {
      id: 2,
      title: "AI Customer Support Chatbot",
      description:
        "Developed an AI-powered chatbot for Marjane Mall using Flask and NLP. Implemented intent classification to handle user queries such as product prices and availability, with a modular design allowing future integration with a SQL database.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80",
      tags: ["Python", "Flask", "NLP", "TensorFlow"],
      category: "AI",
      github: "https://github.com/ElkanteNouhaila/MM-chatbot", 
      vercel:"",
      demo: "https://drive.google.com/file/d/1ba_IO1Td8t7tQxlTtfx7oDwPdz2q0iou/view?usp=drive_link",
      featured: true,
    },
    {
      id: 3,
      title: "Freelance Booking Platform",
      description:
        "Built a scalable freelance booking platform with Node.js, Express, and MongoDB, featuring secure JWT authentication and role-based access control. Enabled freelancers to manage services and users to book them seamlessly. Designed and structured RESTful APIs and optimized data handling using Mongoose.",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&q=80",    tags: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
      category: "Fullstack",
      github: "https://github.com/ElkanteNouhaila/freelance-booking-app", 
      vercel:"",
      demo: null,
      featured: true,
    },
    {
      id: 4,
      title: "AI Coffee Automation with Robotic Arm",
      description:
        "Developed an AI-powered coffee automation system using a Niryo Ned2 robotic arm integrated with a chatbot interface. Enabled users to trigger coffee preparation through API requests, combining robotics control, backend logic, and real-time communication. Configured network communication and optimized system integration between local hardware and hosted services.",
        image: "./public/arm_coffee.png",
        tags: ["Python", "Flask", "Robotics", "API Integration", "Automation"],
      category: "AI",
      github: "", 
      vercel: "",
      demo: null,
      featured: true,
    }
    
  ];