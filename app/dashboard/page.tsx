import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import ArrivalChart from '../_components/ArrivalChart'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "View and manage all your products in one place. Add, update, and delete inventory items with ease.",
  openGraph: {
    title: "Inventory Management | Inventory App",
    description: "View and manage all your products in one place.",
  },
};

export default async function Page() {

    const user = await getCurrentUser()
    const userId = user.id


    const [totalProducts,lowStock,allProducts] = await Promise.all([
      prisma.product.count({where:{userId}}),
      prisma.product.count({where:{userId,
      lowStockAt : {not:null},
      quantity : {lte: 5}


     },
    
    
    }),

    prisma.product.findMany({
      where:{userId},
      select:{price:true , quantity:true, createdAt:true},
    })




    ])

   

    const now = new Date()
     const weeklyProductsData = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekStart.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(weekStart.getDate() ).padStart(2, "0")}`;

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
    
    }


    

    const recentProcuts = await prisma.product.findMany({where:{userId}, 
    take: 5,
    orderBy:{createdAt:"desc"}
    })


    

   
    const totalValue = allProducts.reduce((sum,product) => sum + Number(product.price) * Number(product.quantity), 0)

    const highStockProduct = allProducts.filter((p)=> Number(p.quantity)> 5).length

    const lowStockProduct = allProducts.filter((p)=> Number(p.quantity)<= 5 && Number(p.quantity)>= 1 ).length

    const outOfStockProduct = allProducts.filter((p)=> Number(p.quantity)=== 0  ).length

    const stockPercentage = totalProducts > 0 ? Math.round((highStockProduct / totalProducts ) * 100) : 0


    const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockProduct / totalProducts ) * 100) : 0



    const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStockProduct / totalProducts ) * 100) : 0



console.log(totalValue)
  return (
    <div className='ml-5 p-6 '>
     <h1 className='font-bold text-2xl'>Welcome to your Dashboard 👋</h1>
     <p className='text-gray-600 mb-8'>Here is an overview of your inventory</p>
    
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>

      <div className='bg-white shadow-xl rouned-lg border-gray-300  p-6'>

      <h1 className='text-purple-700 text-2xl p-3 font-bold mb-4'>General info</h1>
       
       <div className='grid grid-cols-1 md:grid-cols-3  gap-6'>
        <div className='flex flex-col items-center  justify-center'>
          <h2 className='text-purple-500 text-3xl font-bold mb-2'>{totalProducts}</h2>
          <span>Total Products</span>
          <TrendingUp className='text-purple-500'/>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-purple-500 text-3xl font-bold mb-2'>{Number(totalValue).toFixed(0)} $</h2>
          <span>Total Value</span>
          <TrendingUp className='text-purple-500'/>
        </div>


        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-purple-500 text-3xl font-bold mb-2'>{lowStock}</h2>
          <span>Low Stock</span>
          <TrendingUp className='text-purple-500'/>
        </div>

        
       </div>

       
      </div>

      <div className='bg-white shadow-xl rouned-lg border-gray-300  p-6'>
      <div className='flex items-center justify-between mb-8'>
          <h1 className='text-purple-700 text-2xl p-3 font-bold mb-4'>New Arrivals Per Week</h1>

      </div>

      <div className='h-48'>

        <ArrivalChart data={weeklyProductsData}/>
      </div>
      </div>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
      <div className='bg-white shadow-xl rouned-lg border-gray-300  p-6'>
        <h1 className='text-purple-700 text-2xl p-3 font-bold mb-4'>Stock Levels</h1>
        <div className='w-full'>

          <div className='space-y-3 '>
            {recentProcuts?.map((r, key)=> {

              const stockLevel = r.quantity === 0 ? 0 : r.quantity <= (r.lowStockAt || 5) ? 1 :2

              const bgColors = ["bg-red-600", "bg-yellow-600", "bg-green-600"]
              const textColor = ["text-red-600", "text-yellow-600", "text-green-600"]

              return(
                <div key={key} className='flex items-center justify-between w-full bg-gray-100 p-2 rounded-md'>
                    

                 <div className='flex items-center gap-2 '>  
                <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]} `}/>  
                  
                <p>{r?.name}</p>
                </div> 
                <p className={`text-sm font-medium ${textColor[stockLevel]}`}>{r?.quantity} in stock</p>
              </div>
           
            )   
           })}
             
           
          </div>
        
        </div>
      </div>

          {/* stock health*/} 
      <div className='bg-white shadow-xl rouned-lg border-gray-300  p-6'>

     <h1 className='text-purple-700 text-2xl p-3 font-bold mb-4'>Stock Percentage</h1>

     <div className='flex items-center justify-center'>

           <div className='relative w-48 h-48'>

             <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>

            <div
            className="absolute inset-0 rounded-full border-8 border-purple-600"
            style={{
             clipPath:
             "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
              }}
                />

             <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center'>
                <p className='text-2xl text-purple-500'>{stockPercentage} %</p>
                <p>in Stock</p>
              </div>
              </div>  


              

           </div>

     </div>

     <div className='mt-5 '>
                
                <div className='flex flex-col items-center space-y-2 '>

                  <div className='flex items-center gap-3 w-40'>

                    <div className='w-3 h-3 rounded-full bg-green-600'/>
                    <span>In Stock {stockPercentage} %</span>
                  </div>


                   <div className='flex items-center gap-3 w-40'>

                    <div className='w-3 h-3 rounded-full bg-yellow-600'/>
                    <span>In Stock {lowStockPercentage} %</span>
                  </div>


                   <div className='flex items-center gap-3 w-40'>

                    <div className='w-3 h-3 rounded-full bg-red-600'/>
                    <span>In Stock {outOfStockPercentage} %</span>
                  </div>
                </div>
                </div> 

      </div>
    </div>
    
    </div>
  )
}

