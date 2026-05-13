// import { useState, useEffect } from 'react'
import { Outlet } from "react-router";
import { Header } from "./layout/components/Header";
import { Footer } from "./layout/components/Footer";

import './App.css'

function App() {
  

  // useEffect(() => {
  // fetch(`${import.meta.env.VITE_API_URL}`)
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // }, [])

  return (
    <>
      <Header/>

      <main>
        <Outlet/>
      </main>

      <Footer/>
    </>
  )
}

export default App
