import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuthLogic } from "../../context/useAuthLogic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthLogic();
  const accent = "#b58742";

  const handleLogout = () => {
    logout();
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
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#b58742]/10 border border-[#b58742]/20 text-[#b58742]"
            >
              Projects
            </Link>

            <Link
              to="/dashboard/messages"
              className="px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white"
            >
              Messages
            </Link>

            <Link
              to="/dashboard/settings"
              className="px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white"
            >
              Settings
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="mb-4 rounded-2xl bg-white/5 p-4">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="mt-1 truncate text-sm text-white">
              {user?.email}
            </p>
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
        {children}
      </div>

    </div>
  );
}