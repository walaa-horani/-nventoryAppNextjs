"use client"
import { Trash } from 'lucide-react'
import React, { useState } from 'react'

export default function InventoryTable({totalProducts}:{totalProducts: any[]} ) {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage  = 8

 //  Calculate the indexes of the current page’s items


 const indexOfLastItem  = currentPage * itemsPerPage
 const indexOfFirstItem = indexOfLastItem - itemsPerPage

   //  Slice the total products array to get only the current page’s items

   const currentProducts = totalProducts.slice(indexOfFirstItem, indexOfLastItem)

   //  Calculate total number of pages

   const totalPages = Math.ceil(totalProducts.length / itemsPerPage)

     //  Function to change page

     const handlePageChange =(page: number) => {
        if(page < 1 ||page > totalPages) return
        setCurrentPage(page)
     }

    const handleDelete = async (id:string) => {
      if (!confirm("Are you sure you want to delete this product?")) return;

      try {
        const res = await fetch(`/api/products/${id}`,{
            method:"DELETE"
        })

        if(res.ok){
            alert("product deleted succefully")
            window.location.reload();
        }else{
            alert("Failed to delete product")
        }
      } catch (error) {
      console.error(error)
      alert("something went wrong")
      }


    }
  return (
    <div className="relative overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="text-xs uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Product name</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Stock</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.map((p, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {p.name}
                  </th>
                  <td className="px-6 py-4">{(Number(p.price))}$</td>
                  <td className="px-6 py-4">{p.quantity}</td>
                  <td className="px-6 py-4">
                    {p.quantity === 0 ? (
                      <span className="text-red-600 font-semibold">Out of stock</span>
                    ) : p.quantity <= 5 ? (
                      <span className="text-yellow-600 font-semibold">Low</span>
                    ) : (
                      <span className="text-green-600 font-semibold">In stock</span>
                    )}
                  </td>
                     <td
                    
                     className="px-6 py-4">
                      <button  onClick={() => handleDelete(p.id)}><Trash  size={18}/></button>
                     </td>     
                   
                </tr>
              ))}
            </tbody>
          </table>

          <div className='flex items-center justify-center gap-2 py-4'>
             {/* Previous Page Button */}

             <button className='px-3 py-1 border rounded disabled:opacity-50' disabled={currentPage === 1} onClick={()=>handlePageChange(currentPage  -1)}>

                    prev
             </button>

               {/* Page Numbers */}

               {Array.from({length: totalPages}, (_, i)=>(
                    <button className={`px-3 py-1 border rounded cursor-pointer ${currentPage === i + 1 ? "bg-purple-600 text-white" : ""}`} onClick={()=>  handlePageChange(i + 1)} key={i}>

                     {i + 1}
                    </button>
                ))}  


              <button className='px-3 py-1 border rounded  disabled:opacity-50' disabled={currentPage === totalPages} onClick={()=>handlePageChange(currentPage  +1)}>

                    Next
             </button>
          </div>
        </div>
  )
}
