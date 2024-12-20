import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Licznik from './components/Licznik'
import Layout from './pages/Layout';
import Blog from './pages/Blog';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Dodaj from './pages/Dodaj';
import Article from './pages/Article';

function App() {


  return (
    <>
      <Licznik/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/dodaj' element={<Dodaj/>}/>
            <Route path='/article/:id' element={<Article/>}/>
            <Route path='*' element={<NoPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
