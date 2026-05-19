import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLock, FiMail } from "react-icons/fi";

const accent = "#b58742";

export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-gray-400">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#b58742] border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const err = await login(email, password);
    setSubmitting(false);

    if (err) {
      setError(err);
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0f0f] px-6 py-12 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(to right, ${accent} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[#b58742]/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#b58742]">
            Admin
          </p>
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="mt-2 text-sm text-gray-500">
            Access your portfolio dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
        >
          <div className="mb-5">
            <label className="mb-2 block text-sm text-gray-400">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#b58742]/50"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-400">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#b58742]/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: accent }}
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600">
          <a href="/" className="text-gray-500 transition hover:text-[#b58742]">
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
