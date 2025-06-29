import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-overlay">
        <h1 className="contact-heading">Get in Touch</h1>
        <p className="contact-subheading">We'd love to help plan your next adventure!</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button className="contact-button" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
