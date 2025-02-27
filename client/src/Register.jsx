import React, { useState } from 'react';
import axios from 'axios';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [district, setDistrict] = useState('');
  const [place, setPlace] = useState('');
  const [proof, setProof] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');


  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('address', address);
    formDataToSend.append('contact', contact);
    formDataToSend.append('district', district);
    formDataToSend.append('place', place);
    
    if (proof) formDataToSend.append('proof', proof);
    if (photo) formDataToSend.append('photo', photo);

    try {
        
      axios.post('http://localhost:5000/userReg', formDataToSend).then((response) => {
        setMessage('Registration successful!');
        console.log('Registration successful:', response.data);
      })
      
    } catch (error) {
      setMessage('Error registering. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      {message && <p>{message}</p>}
      <form >
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            pattern="[0-9]{10}"
            required
            placeholder="Enter 10-digit contact number"
          />
        </div>
        <div>
          <label>Proof:</label>
          <input type="file" onChange={(e) => setProof(e.target.files[0])} required />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required />
        </div>
        <div>
          <label>District:</label>
          <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required />
        </div>
        <div>
          <label>Place:</label>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />
        </div>
        <button onClick={handleSubmit} type="button">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
