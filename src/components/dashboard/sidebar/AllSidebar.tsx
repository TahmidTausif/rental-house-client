"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Home, Menu, X, LayoutDashboard, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";  // Import signOut from next-auth/react
import Loader from "@/components/shared/Loader";
import Image from "next/image";
import { useState } from "react";

interface Link {
  label: string;
  href: string;
}

const AdminSidebar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  if (status === "loading") return <Loader />;
  if (!session) return <div>You need to sign in</div>;

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "email",
    imgURL: session?.user?.imageUrl || "/avatar-placeholder.png",
  };

  const role = session?.user?.role;

  const adminLinks = [
    { label: "Dashboard Overview", href: "/dashboard/admin" },
    { label: "All Users", href: "/dashboard/admin/users" },
    { label: "All Listings", href: "/dashboard/admin/listings" },
  ];

  const tenantLinks = [
    { label: "Dashboard Overview", href: "/dashboard/tenant" },
    { label: "Rental Requests", href: "/dashboard/tenant/rental-request" },
    { label: "Rental Status", href: "/dashboard/tenant/rental-status" },
  ];

  const landlordLinks = [
    { label: "Dashboard Overview", href: "/dashboard/landlord" },
    { label: "Add New Listing", href: "/dashboard/landlord/add-listing" },
    { label: "My Listings", href: "/dashboard/landlord/rental-listings" },
    { label: "My Rentals", href: "/dashboard/landlord/rental-requests" },
  ];

  let links: Link[] = [];
  if (role === "admin") links = adminLinks;
  else if (role === "tenant") links = tenantLinks;
  else if (role === "landlord") links = landlordLinks;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });  // Optionally redirect to homepage after logout
  };

  return (
    <aside
      className={`${isExpanded ? "w-64" : "w-20"
        } transition-all duration-300 min-h-screen flex flex-col justify-between px-4 py-6 sidebar-theme shadow-theme`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center ml-2 mb-6">
        {isExpanded && <h2 className="text-xl font-bold">Dashboard</h2>}
        <button onClick={toggleSidebar}>
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* User Info */}
      {isExpanded && (
        <div className="flex items-center gap-3 mb-6">
          <Image
            src={user.imgURL}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 flex-1">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition ${pathname === href ? "sidebar-button-theme font-semibold" : ""
              }`}
          >
            <div className="w-5 flex justify-center">
              <LayoutDashboard size={18} />
            </div>
            {isExpanded && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-[color:var(--sidebar-foreground)]/20 pt-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-secondary/10 transition"
        >
          <Home size={16} />
          {isExpanded && <span>Home</span>}
        </Link>
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-secondary/10 transition"
        >
          <User size={16} />
          {isExpanded && <span>My profile</span>}
        </Link>

        <button
          onClick={handleLogout}  // Add the onClick handler for logout
          className="flex items-center gap-2 text-sm px-3 py-2 text-red-400 hover:text-red-500 rounded-md mt-2"
        >
          <LogOut size={16} />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
