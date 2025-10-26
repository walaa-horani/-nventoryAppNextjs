"use client"
import React, { useState } from 'react'

export default function page() {

    const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    lowStockAt: "",
    })
      const [loading, setLoading] = useState(false)

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault()
         setLoading(true);
   

    try {
        const res = await fetch("/api/products", {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(form)

        })

        if(res.ok){
            alert("Product added successfully")
            setForm({ name: "", price: "", quantity: "", lowStockAt: "" })

        }else{
            const data = await res.json()
          alert(`${data.error || "Failed to add product"}`)
        }
    } catch (error) {
       console.error(error);
      alert("Something went wrong");
    }finally{
        setLoading(false)
    }
 }
  

  return (
     <div className="w-full  p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">Add New Product 🛒</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="number"
          name="lowStockAt"
          placeholder="Low Stock Alert (optional)"
          value={form.lowStockAt}
          onChange={(e) => setForm({ ...form, lowStockAt: e.target.value })}
          className="w-full border rounded px-4 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  
  )
}
