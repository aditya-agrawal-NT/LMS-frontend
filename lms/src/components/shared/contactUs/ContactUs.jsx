import React from 'react'
import { useState } from 'react'
import './ContactUs.css'

const ContactUs = () => {
 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        issue: ''
    });
    const handelChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handelSubmit =(e) => {
        e.preventDefault();
        alert(`Thank you ${formData.name}`)
        setFormData({
            name: '',
            email: '',
            issue: ''
        })
    }
  return (
    <div>
        <h1>Contact Us</h1>
        <form onSubmit={handelSubmit}>
            <div>
            <label>Name:</label>
            <input
            type='text'
            placeholder='Name'
            name='name'
            value={formData.name}
            id='name'
            onChange={handelChange}
             />
             </div>
        <div>
            <label>Email:</label>
            <input 
            type='text'
            placeholder='Email'
            name='email'
            value={formData.email}
            id='email'
            onChange={handelChange}
            />
        </div>
        <div>
            <label>Issue:</label>
            <input 
            type="text"
            placeholder='Issue'
            name='issue'
            value={formData.issue}
            id='issue'
            onChange={handelChange} 
            />
        </div>
        <div>
            <button type='submit'>Submit</button>
        </div>
        </form>
    </div>
  )
}

export default ContactUs