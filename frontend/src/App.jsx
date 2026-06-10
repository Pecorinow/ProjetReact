// import { useState, useEffect } from 'react'
import { Outlet } from "react-router";
import { Header } from "./layout/components/Header";
import { Footer } from "./layout/components/Footer";

import './App.css'

function App() {

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
