import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  return (
    <aside className="h-full w-24 lg:w-80 bg-gray-100 shadow-md flex flex-col transition-all duration-300">
      {/* Header */}
      <header className="bg-white shadow-sm w-full p-6 flex items-center gap-3">
        <Users className="w-7 h-7 text-gray-700" />
        <span className="font-semibold text-gray-800 hidden lg:block">
          Contacts
        </span>
      </header>

      {/* Skeleton List */}
      <section className="flex-1 overflow-y-auto py-4 px-4 space-y-5">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="skeleton size-14 rounded-full bg-gray-300" />
            <div className="hidden lg:flex flex-col gap-3 flex-1">
              <div className="skeleton h-5 w-36 bg-gray-300" />
              <div className="skeleton h-4 w-24 bg-gray-300" />
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
};

export default SidebarSkeleton;
