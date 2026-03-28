import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => alert("Message sent successfully! 🎉"))
      .catch(() => alert("Something went wrong. Please try again."));
  };

  const socials = [
    { icon: <MdEmail size={20} />, label: "Email", href: "mailto:nouhailaelkante2@gmail.com" },
    { icon: <MdPhone size={20} />, label: "Phone", href: "tel:+212644072535" },
    { icon: <FaGithub size={20} />, label: "GitHub", href: "https://github.com/ElkanteNouhaila" },
    { icon: <FaLinkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/nouhaila-elkante/" },
  ];

  return (
    <section className="py-24 bg-[#0f0f0f] text-white px-6" id="contact">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <p className="text-[#b58742] text-xs font-semibold tracking-widest text-center uppercase mb-3">
          Let's Talk
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Get In <span className="text-[#b58742]">Touch</span>
        </h2>
        <p className="text-gray-500 text-center max-w-md mx-auto mb-16">
          Open to collaborations, freelance projects, or just a friendly chat about AI and tech.
        </p>

        <div className="grid md:grid-cols-5 gap-8">
          
          {/* Left info panel */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-1">Contact Info</h3>
              <p className="text-gray-500 text-sm mb-6">Reach out through any of these channels:</p>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:text-[#b58742] hover:bg-[#b58742]/5 border border-transparent hover:border-[#b58742]/20 transition-all duration-300 text-sm font-medium"
                  >
                    <span className="text-[#b58742]">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="md:col-span-3 bg-[#111111] border border-white/5 rounded-2xl p-6">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#b58742] focus:shadow-sm focus:shadow-[#b58742]/20 transition-all duration-300"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  className="px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#b58742] focus:shadow-sm focus:shadow-[#b58742]/20 transition-all duration-300"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#b58742] focus:shadow-sm focus:shadow-[#b58742]/20 transition-all duration-300"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 resize-none focus:outline-none focus:border-[#b58742] focus:shadow-sm focus:shadow-[#b58742]/20 transition-all duration-300"
              />
              <button
                type="submit"
                className="py-3.5 bg-[#b58742] text-black font-semibold text-sm rounded-xl hover:bg-[#c99a50] hover:shadow-xl hover:shadow-[#b58742]/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
