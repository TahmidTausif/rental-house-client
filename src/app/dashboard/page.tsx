"use client"; // Only for App Router! Remove if you're using Pages Router

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // use 'next/router' for Pages Router
import Loader from "@/components/shared/Loader";

export default function DashboardRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
      return;
    }

    const role = session.user.role;

    if (role === "admin") {
      router.push("/dashboard/admin");
    } else if (role === "tenant") {
      router.push("/dashboard/tenant");
    } else if (role === "landlord") {
      router.push("/dashboard/landlord");
    } else {
      router.push("/not-authorized");
    }
  }, [session, status, router]);

  return (
    <div className="p-20">
      <Loader/>
    </div>
  );
}
