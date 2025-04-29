"use client";

import { useSession } from "next-auth/react";
import AllSidebar from "../../../components/dashboard/sidebar/AllSidebar";
import Loader from "@/components/shared/Loader";

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  if (!session) {
    return <div>You need to sign in</div>;
  }

  return (
    <div className="relative">
      {/* Sidebar fixed on the left */}
      <aside className="fixed top-0 left-0 h-screen w-64 z-50">
        <AllSidebar />
      </aside>

      {/* Main content pushes to the right */}
      <main className="ml-10 md:ml-56 md:mr-32 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

// export default DashboardLayout
// import { AppSidebar } from "@/components/module/dashboard/sidebar/app-sidebar";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";

// const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>)=> {

//   const { data: session, status } = useSession();
// console.log({session},"sesion found")
//   if (status === "loading") {
//     return <Loader/>;
//   }

//   if (!session) {
//     // Handle the case when the user is not authenticated
//     return <div>You need to sign in</div>;
//   }

//   return (
//     <SidebarProvider >
//       <AppSidebar role='tenant' />

//       <SidebarInset>
//         <header className="flex flex-col h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
//           <div className="flex items-center gap-2 px-4">
//           <SidebarTrigger className="-ml-1" />
//           </div>
//         </header>
        
//         <div className="p-4 pt-0 ">{children}</div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

// export default DashboardLayout;