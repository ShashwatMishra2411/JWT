// import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Singup from './Singup'
import Login from './Login'
import Home from './Home'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Singup/>}></Route>
        <Route path='/signin' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </div>
  )
}
