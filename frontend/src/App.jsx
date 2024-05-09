import React, { useState } from 'react'
import { Button } from 'reactstrap'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavBar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import Footer from './components/Footer.jsx'
import AddProperties from './components/AddProperties.jsx'
import Property from './pages/Property.jsx'
import AddHouse from './components/AddHouse.jsx'
import DeleteProperty from './pages/DeleteProperty.jsx'
import UpdateHouse from './pages/UpdateHouse.jsx'
import DeleteHouse from './pages/DeleteHouse.jsx'
import SearchedProperties from './components/SearchedProperties.jsx'

import { getLocalStorageData } from './components/Navbar.jsx'
import ViewHouses from './pages/ViewHouses.jsx'

export const url1 = 'http://localhost:5000/'
export const url2 = 'https://backend.kejaspace.com/'

const App = () => {

  const userName = localStorage.getItem('userName')
  getLocalStorageData("userName")

  return (
    <>      
      <main>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/viewproperty/:propertyId' element={<Property />} />
            <Route path='/viewhouses/:propertyId' element={<ViewHouses />} />
            <Route path='/searchedProperties' element={<SearchedProperties />} />
            {userName &&
              <>
                <Route path='/logout' element={<Logout />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/addproperty' element={<AddProperties />} />                
                <Route path='addhouse/:propertyId' element={<AddHouse />} />
                <Route path='/profile/deleteproperty/:propertyId' element={<DeleteProperty />} />
                <Route path='/profile/updateadvert/:houseId' element={<UpdateHouse />} />
                <Route path='/profile/deletehouse/:houseId'element={<DeleteHouse />} />
              </>
            }          
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>      
      

    </>
  )
}

export default App
