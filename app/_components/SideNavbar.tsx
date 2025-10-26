import { Calendar, Home, Inbox, LayoutDashboard, Package, Plus, Search, Settings } from "lucide-react"

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
import { UserButton, useUser } from "@stackframe/stack"


interface AppSidebarProps {
  currentPath:string
}
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Add Product",
    url: "/dashboard/add-product",
    icon: Plus,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar({ currentPath }: AppSidebarProps) {

  const user = useUser()
  return (
    <Sidebar className=" relative   shadow-lg border-r border-gray-100">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive  = currentPath === item.url

                  return (
           <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a className={`${isActive ? "bg-gray-200 text-purple-700 font-bold" : "text-gray-700  "}`} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                  )
             
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

              <div className="absolute bottom-3 left-2">
                <div className="flex items-center gap-3">
                   <UserButton/>
                    {user && (
                       <span>
                   {user?.displayName}
                   </span>
                    )}
                  
                </div>
               
              </div>
      </SidebarContent>
    </Sidebar>
  )
}