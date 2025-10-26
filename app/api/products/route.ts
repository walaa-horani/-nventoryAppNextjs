import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser()
         const userId = user?.id;


         const body = await req.json()
         const {name, price, quantity, lowStockAt} = body


         if (!name || !price || quantity == null){
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })

             //  Create product

           
         }


          const newProduct  = await prisma.product.create({
        data: {
        name,
        price: Number(price),
        quantity: Number(quantity),
        lowStockAt: lowStockAt ? Number(lowStockAt) : 5, 
        userId,
        }
             }) 

          return NextResponse.json(newProduct);   
    } catch (error) {
     console.error("Error creating product:", error);
     return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}