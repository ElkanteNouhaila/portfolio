import DashboardLayout from "../components/dashboard/dashboardLayout";

export default function Messages() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 text-white">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Incoming messages from your portfolio visitors
          </p>
        </div>

        {/* EMPTY STATE (for now since no backend yet) */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-10 text-center">

          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
            💬
          </div>

          <h2 className="text-lg font-medium mb-2">
            No messages yet
          </h2>

          <p className="text-sm text-gray-500">
            When someone contacts you through your portfolio, messages will appear here.
          </p>

          <div className="mt-6">
            <button className="px-5 py-2.5 rounded-2xl bg-[#b58742] text-black font-medium hover:opacity-90 transition">
              Refresh
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}