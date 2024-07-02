import React from 'react';
import "./tmdb.css";


const Footer = () => {
  return (
    <footer className='footerStyle'>
      <p>&copy; 2024 | All rights reserved</p>
      <p>Contact: kuldeepsingh53555@gmail.com</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: 'gold', // Gold background color
  color: '#000', // Black text color
  textAlign: 'center',
  padding: '1rem',
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
};

export default Footer;
