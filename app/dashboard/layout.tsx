"use client"

import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '../_components/SideNavbar'
import { usePathname } from 'next/navigation'

function DashboardLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()
   return (
    <SidebarProvider>
      <AppSidebar currentPath={pathname}/>
      <main  className='w-full'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout