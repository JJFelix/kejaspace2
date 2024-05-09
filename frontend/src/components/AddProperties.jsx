import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterForm.css' 
import axios from 'axios'

const AddProperties = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [propertyData, setPropertyData] = useState({
    propertyTitle:"",
    propertyType:"",
    location:"",
    description:"",
    contact:"",
    profilePic:{
      picName: "", 
        picContent:"base64"
    }
  })

  const navigate = useNavigate()

  const handleInputChange = (e) =>{
    const { name, value, files } = e.target

    if (name === 'profilePic') {
      const file = files[0];
  
      const reader = new FileReader();
      reader.onload = (event) => {
        setPropertyData({
          ...propertyData,
          profilePic: {
            picName: file.name,
            picContent: event.target.result.split(',')[1], // Extracting the base64 content
          },
        });
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      // Handle other input fields
      setPropertyData({
        ...propertyData,
        [name]: value,
      });
    }
}

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(propertyData)
    const token = localStorage.getItem("sessionToken")
    axios
      .post('https://backend.kejaspace.com/profile/addproperty', propertyData, {
        headers:{
            'authorization': token
        }
        
      })
      .then(response =>{
        setSuccess('Property added successfully')
        setError(null)
        navigate('/profile')
      })
      .catch(error =>{
        console.error(error)
        setError('Failed to add property. Please try again')
      })
  }

  return (
    <div className='main-wrapper'>
      <div>
        <h3>Add Property</h3>
      </div>

      {error && 
            <div className="alert alert-danger register-form">
                <p className='danger'>{error}</p>
            </div>
        }
        {success &&
            <div className="alert alert-success register-form">
                <p>{success}</p>
            </div>
        }

      <div>
        <form className='register-form' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="propertyTitle" className="form-label">Property Title</label>
            <input name="propertyTitle" value={propertyData.propertyTitle} onChange={handleInputChange} type='text' className="form-control" id="propertyTitle" aria-describedby="propertyTitle" />
          </div>
          <div className="mb-3">
            <label htmlFor="propertyType" className="form-label">Property Type</label>: 
            <select name="propertyType" id="propertyType" value={propertyData.propertyType} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option> </option>
              <option>Commercial</option>
              <option>Residential</option>
              <option >Both</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input name="location" value={propertyData.location} onChange={handleInputChange} type='text' className="form-control" id="location" aria-describedby="location" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input name="description" value={propertyData.description} onChange={handleInputChange} type='text' className="form-control" id="description" aria-describedby="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">Contact</label>
            <input name="contact" value={propertyData.contact} onChange={handleInputChange} type='text' className="form-control" id="contact" aria-describedby="contact" />
          </div>
          <div className="mb-3">
            <label htmlFor="profilePic" className="form-label">Profile Picture</label>
            <input name='profilePic' onChange={handleInputChange} type="file" className="form-control" id="profilePic" aria-describedby="profilePic" />
          </div>
          
          <button type="submit" className=" button btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddProperties

