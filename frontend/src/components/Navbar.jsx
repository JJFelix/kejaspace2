import React, {useState} from 'react'
import './Navbar.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export const getLocalStorageData = (key) => {
    const expirationTime = localStorage.getItem(key + '_ts')
    if (expirationTime && Date.now() > expirationTime) {
      localStorage.removeItem(key);
      localStorage.removeItem(key + '_ts')
      return null; // Data expired
    }
    return localStorage.getItem(key)
  }

const NavBar = () =>{

    const [error, setError] = useState()

    const handleLogout = () =>{
        const userId = localStorage.getItem("userId")
        const sessionToken = localStorage.getItem("sessionToken")
        console.log(`User Id: ${userId}, sessionTokne: ${sessionToken}`)
        // localStorage.removeItem("sessionToken")
        // localStorage.removeItem('userId')

        axios
        .get(`https://backend.kejaspace.com/logout/${userId}`,{
            headers:{
                'authorization': sessionToken
            }
        })
        .then((response)=>{
            console.log('logged out')
            window.location.reload(true)            
        })
        .catch((error)=>{
            setError(error.response.data.error)
        })
        localStorage.removeItem("sessionToken")
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        localStorage.removeItem('userName' + '_ts')
        localStorage.removeItem('propertyId')
    }

    const userName = localStorage.getItem('userName')
    const profileImage = '/images/profile.jpeg'
    getLocalStorageData("userName")

  return (
    <>
        {/* <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div class="container-fluid p-3">
                <a class="navbar-brand me-5" href="#">Keja Space</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link me-3" aria-current="page" href="/">Home</a>
                        <a class="nav-link me-3" href="/profile">Profile</a>
                        <a class="nav-link me-3" href="/properties">Properties</a>
                    </div>

                    <div class="navbar-nav ml-auto">
                        <a class="nav-link ml-auto ml-auto" href="/register">Register</a>
                        <a class="nav-link ml-auto ml-auto" href="/login">Login</a>
                        <a class="nav-link ml-auto ml-auto" href="/logout">Logout</a>
                    </div>
                </div>
            </div>
        </nav> */}
        <header>
            <div className="container-fluid name-tag"> 
            {/* container */}
                
                <div className='text-white'>
                    <img src={profileImage} className='profile-image' alt="" />
                    <h1>Keja Space</h1>
                </div>
                <div className="nav-item me-0 user-actions">
                    {!userName &&
                        <div className='d-flex gap-3'>
                            <Link to={'/register'} className='nav-link text-white'>
                                <button className='btn btn-success'>Register</button>
                            </Link>
                            <Link to={'/login'} className='nav-link text-white'>
                                <button className='btn btn-success'>Login</button>
                            </Link>
                        </div>
                    }
                    {userName &&
                        <Link to={'/login'} onClick={handleLogout} className='nav-link active text-white'>
                            <button className='btn btn-warning'>Logout</button>
                        </Link>
                        // <a href="/login" className='nav-link' onClick={handleLogout}>LOGOUT</a>
                    }                    
                </div>
            </div>
            <div className='container-fluid d-flex mt-3 justify-content-center'>
                <nav>                    
                    <ul className="nav">
                        {/* {userName &&
                        <>
                            <Link to={'#'} className='nav-link me-0 text-decoration-none'>
                                <p className="nav-link active ">Hello, {userName}</p>
                            </Link>                              
                        </>                 
                        } */}
                        <Link to={'/'} className='nav-link '>
                            <p >HOME</p>
                        </Link> 
                        {userName && 
                            <Link to={'/profile'} className='nav-link'>
                                <p >PROFILE</p>
                            </Link>
                        }   
                        <Link to={'/'} className='nav-link'>
                            <p >ABOUT US</p>
                        </Link>
                        <Link to={'/'} className='nav-link'>
                            <p >BLOG</p>
                            
                        </Link>                     
                    </ul>
                </nav>
            </div>
        </header>
        {error && 
            <div className="alert alert-danger register-form">
                <p className='danger'>Error: {error}</p>
            </div>
        }
        
    </>
  );
}

export default NavBar

