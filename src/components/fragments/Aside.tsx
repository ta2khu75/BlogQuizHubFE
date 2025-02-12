import React from 'react'
import { Group, ChartColumn, UsersRound, Settings, TypeOutline } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: ChartColumn,
  },
  {
    title: "Account",
    url: "/admin/account",
    icon: UsersRound,
  },
  {
    title: "Role",
    url: "/admin/role",
    icon: Group,
  },
  {
    title: "Category",
    url: "/admin/exam-category",
    icon: TypeOutline,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
const Aside = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default Aside 