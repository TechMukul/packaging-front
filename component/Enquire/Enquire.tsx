import React, { useState } from 'react';
import axios from 'axios';
import styles from './index.module.scss'; // Import your CSS file for styling

const Enquire = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Validate email
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate phone number
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const response = await axios.post('http://localhost:3000/form/data', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Form submitted successfully:', response.data);
      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className={styles.enquireContainer}>
      <h1 className={styles.heading}>Have Any Query?</h1>
     
      <form className={styles.enquireForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.inputField}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className={styles.inputField}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className={styles.inputField}
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            name="message"
            placeholder="Message"
            className={styles.textArea}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div> {error && (
        <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
          {error}
        </p>
      )}
        <button type="submit" className={styles.button}>Submit</button>
       
      </form>
    </div>
  );
};

export default Enquire;
