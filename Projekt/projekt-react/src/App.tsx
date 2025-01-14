import { useEffect, useState } from 'react'
import './App.css'
import Test1 from './components/Test1'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Koszyk from './pages/Koszyk';
import Login from './pages/Login';
import Product from './pages/Product';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import EditReview from './pages/EditReview';
import Orders from './pages/Orders';


function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='/koszyk' element={<Koszyk/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/product/:id/editreview/:userID' element={<EditReview/>}/>
            <Route path='*' element={<NoPage/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
