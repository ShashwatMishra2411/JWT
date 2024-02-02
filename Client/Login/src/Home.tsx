import { useEffect, useState } from 'react'
import axios from 'axios'

interface Response {
  _id: string;
  username: string;
  password: string;
  __v: number;
}

export default function Home() {
  const [data, setData] = useState<Response[]>()
  // const [isAuth, setIsAuth] = useState<boolean>(false)
  
    useEffect(()=>{
        axios.get("http://localhost:3000/login",{
            headers:{
              authorization: `${localStorage.getItem("jwt_token")}`
            }
        }).then((res)=>{
            console.log(res.status)
            setData(res.data)
        }).catch((error)=>{
          alert(error.message)
        })
    },[])
  return (
    <div>
      {data?.map((item)=>{
        return <div key={item._id}>{item.username}</div>
      })}
    </div>
  )
}
