import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_9g8qz6a", // Replace with your EmailJS service ID
        "template_k2ny0wi", // Replace with your EmailJS template ID
        form.current,
        "d9_01bXVNPKu5k1R_" // Replace with your EmailJS public key
      )
      
      .then(
        (result) => {
          console.log(result.text);
          setStatus("✅ Message sent successfully!");
          setIsSending(false);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("❌ Failed to send. Please try again.");
          setIsSending(false);
        }
      );
      console.log("Service:", "service_xxxx");
console.log("Template:", "template_xxxx");
console.log("Public Key:", "public_xxxx");

  };

  return (
    <div className="contact-container">
      <div className="contact-overlay">
        <h1 className="contact-heading">Get in Touch</h1>
        <p className="contact-subheading">We'd love to help plan your next adventure!</p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button className="contact-button" type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
};

export default Contact;
