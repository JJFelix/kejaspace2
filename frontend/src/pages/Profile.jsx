import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import './Profile.css'
import '../components/FeaturedProperties.css'
import axios from 'axios'


const Profile = () => {
  const [propertyDetails, setPropertyDetails] = useState([])
  const [userDetails, setUserDetails] = useState({})
  // const userName = localStorage.getItem('userName')

  useEffect(()=>{
    localStorage.removeItem("propertyId")
    localStorage.removeItem("selectedHouse")
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("sessionToken")
    axios
    .get(`https://backend.kejaspace.com/profile/${userId}`, {
        headers:{
          'authorization': token
        }
    })
    .then(response =>{
        // console.log(response);
      const userDetails = response.data.userDetails
      setUserDetails(userDetails)
      const propertyDetails = response.data.propertyDetails
      setPropertyDetails(propertyDetails)
      console.log('My properties',propertyDetails)
      // setPropOwner(propertyDetails[0].userId)
      // console.log('User details', userDetails);
    })
    .catch(error =>{
        console.log(error)
    })
  }, [])

  const dummyImage = '/images/ralph-ravi-kayden-mR1CIDduGLc-unsplash_d06c8bcd5110495c926a7afca70ae57e.jpg'

  return(
    <>
      <div className='main-wrapper'>
        <h1>Profile</h1>
        <div className='user-info'>
          <div className='property-image'>
            <img src={propertyDetails[0]?.profilePic}  alt="none" />
          </div>
          <div className='user-details'>
            <h4>{userDetails.firstName} {userDetails.lastName}</h4>
            {userDetails.email}
          </div>    
          <Link to={'/addproperty'} className='btn btn-primary'>
            Add Property
          </Link>      
        </div>
        {/* <Link to={'/addproperty'} className='btn btn-primary'>
          Add Property
        </Link> */}

        <h2>My Properties</h2>

        <div className='property-main-card'>
          {propertyDetails.map((property) => (
          <div className="property-inner-card" key={property.propertyId}>
              <img src={property.profilePic} className='property-inner-image' alt={property.propertyTitle} />
              <p>{property.propertyTitle}</p>
              <div className='buttons d-flex justify-content-center gap-4'>
                <Link to={{
                  pathname: `/viewproperty/${property.propertyId}`,
                  }} className='btn btn-secondary'>
                  <span className='text-decoration-none'>
                    <small>View </small><i className="fa-solid fa-eye"></i>
                  </span>
                </Link>
                <Link 
                  to={{
                    pathname: `/profile/deleteproperty/${property.propertyId}`,
                  }}
                  className='btn btn-danger'>
                  <span>
                    <small>Delete </small><i className="fa fa-trash" aria-hidden="true"></i>
                  </span>
                </Link>
              </div>
              
          </div>
          ))}
        </div>

      </div> 
    </>
  )
}

  export default Profile