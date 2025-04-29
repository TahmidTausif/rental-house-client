"use client";

import * as React from "react";
import {
  Bot,
  Pen,
  SquareTerminal,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Logo from "../../../../assets/rental.png";
import Image from "next/image";


const getNavItems = (role: "tenant" | "landlord" | "admin") => {
  if (role === "tenant") {
    return [
      {
        title: "Dashboard",
        url: "/dashboard/tenant/dashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "House Rent Data",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Request Rent List",
            url: "/dashboard/tenant/request-rent",
          },
          {
            title: "Rented House",
            url: "/dashboard/tenant/rented-house",
          },
          
        ],
      },
      {
        title: "Review Management",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Give Review",
            url: "/dashboard/tenant/give-review"
          },
          {
            title: "Manage Review",
            url: "/dashboard/tenant/manage-review"
          },
          
        ],
      },
      {
        title: "Update Profile",
        url: "/dashboard/tenant/update-profile",
        icon: User,
        isActive: true,
      },
    ];
  } else if (role === "landlord") {
    return [
      {
        title: "Dashboard",
        url: "/landlord/dashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "My Rental Add",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Manage Add",
            url: "/landlord/manage-add"
          },  
        ],
      },  
      {
        title: "Add Post",
        url: "/landlord/add-post",
        icon: Pen,
      },
      {
        title: "Manage Add Post",
        url: "/landlord/manage-add-post",
        icon: Bot,
      },
    ];
  }
  else {
    return [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "All Rental Add",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Manage Add",
            url: "/admin/manage-add"
          },  
        ],
      },  
      {
        title: "Add Post",
        url: "/landlord/add-post",
        icon: Pen,
      },
      {
        title: "Manage Add Post",
        url: "/landlord/manage-add-post",
        icon: Bot,
      },
      {
        title: "Manage user",
        url: "/admin/manage-user",
        icon: Bot,
      },
    ];
  }
};

export function AppSidebar({ role, ...props }: { role: "tenant"| "landlord" | "admin"}  & React.ComponentProps<typeof Sidebar>) {
  const navMain = getNavItems(role);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        <SidebarMenu >
          <SidebarMenuItem >
            <SidebarMenuButton size="lg" asChild >
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Image src={Logo} alt="logo" width={56}/>
                  <h2 className="text-xl  lg:text-2xl font-bold lg:font-extrabold text-primary">
            Rental<span className="text-secondary">House</span>
          </h2>
                </div>

              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-black text-gray-200">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-black text-gray-200">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
