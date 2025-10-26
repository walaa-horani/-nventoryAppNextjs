"use client"
import React from 'react'


import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CharData {
    week: string,
    products:number
}

export default function ArrivalChart({data}:{data:CharData[]}) {
  console.log(data)
  return (
    <div className='w-full h-48 '>
       <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} >
        <CartesianGrid strokeDasharray="4 4" stroke='#8b5cf6'/>
        <XAxis dataKey="week"  interval={0}  textAnchor="end"  angle={-45} stroke='#666' fontSize={12} />

         <YAxis  interval={0} allowDecimals={false} textAnchor="end"  angle={-45} stroke='#666' fontSize={12} />
         <Tooltip
          contentStyle= {{
            backgroundColor: "white",
            border: "1px solid #8b5cf6",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
         labelStyle={{ fontWeight: "bold", color: "#8b5cf6" }}
         formatter={(value:number) => [`${value} products added`]}
        labelFormatter={(label: string) => `Week: ${label}`}
         
         />

         
         <Area 
            type="monotone"
            dataKey="products"
            stroke="#8b5cf6"
            fill="#c4b5fd"
            strokeWidth={2}
         />
        </AreaChart>
       </ResponsiveContainer>
    </div>
  )
}
