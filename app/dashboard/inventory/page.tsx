import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/prisma'
import React from 'react'
import InventoryTable from './InventoryTable'

export default async function Page() {
  const user = await getCurrentUser()
  const userId = user.id

  const totalProducts = await prisma.product.findMany({ where: { userId } })

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="ml-64 p-7">
        <h1 className="font-bold text-2xl mb-2">Manage your inventory 👋</h1>
        <p className="text-gray-600 mb-8">
          Here you can add, update and delete your products
        </p>


        <InventoryTable totalProducts= {totalProducts}/>
       
      </div>
    </div>
  )
}
