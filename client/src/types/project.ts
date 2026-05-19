export type Project = {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  github?: string;
  demo?: string | null;
  vercel?: string;
};
