import React, { useEffect } from 'react'
import axios from 'axios'
export default function Home() {
    useEffect(()=>{
        axios.get("http://localhost:3000/login").then((res)=>{
            console.log(res.data)
        })
    })
  return (
    <div>
      
    </div>
  )
}
