import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been sent.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">GET IN TOUCH</span>

          <h1>
            We'd love to
            <br />
            <em>hear from you.</em>
          </h1>

          <p>
            Have a question, feedback, or simply want to say hello?
            Our team is always here to help.
          </p>
        </div>

        <div className="contact-hero-circle"></div>
      </section>


      {/* CONTACT CONTENT */}
      <section className="contact-content">

        {/* LEFT SIDE */}
        <div className="contact-info">

          <span className="contact-section-label">
            CONTACT US
          </span>

          <h2>
            Let's start a
            <br />
            <em>conversation.</em>
          </h2>

          <p className="contact-description">
            Whether you need help with an order, have a product
            question, or want to share your feedback, feel free
            to reach out to us.
          </p>


          {/* EMAIL */}
          <div className="contact-info-item">
            <div className="contact-icon">
              <Mail size={20} strokeWidth={1.6} />
            </div>

            <div>
              <span>Email</span>
              <p>bhadhauriyaayush@gmail.com</p>
            </div>
          </div>


          {/* PHONE */}
          <div className="contact-info-item">
            <div className="contact-icon">
              <Phone size={20} strokeWidth={1.6} />
            </div>

            <div>
              <span>Phone</span>
              <p>+91 9454593474</p>
            </div>
          </div>


          {/* LOCATION */}
          <div className="contact-info-item">
            <div className="contact-icon">
              <MapPin size={20} strokeWidth={1.6} />
            </div>

            <div>
              <span>Location</span>
              <p>Kanpur, Uttar Pradesh, India</p>
            </div>
          </div>

        </div>


        {/* FORM */}
        <div className="contact-form-wrapper">

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="contact-form-row">

              <div className="contact-input-group">
                <label>Your Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>


              <div className="contact-input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

            </div>


            <div className="contact-input-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              />
            </div>


            <div className="contact-input-group">
              <label>Your Message</label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="6"
                required
              ></textarea>
            </div>


            <button
              type="submit"
              className="contact-submit-btn"
            >
              SEND MESSAGE

              <Send
                size={17}
                strokeWidth={1.8}
              />
            </button>

          </form>

        </div>

      </section>


      {/* BOTTOM SECTION */}
      <section className="contact-bottom">

        <div>
          <span>SHOPIFY</span>

          <h2>
            Here whenever
            <br />
            <em>you need us.</em>
          </h2>
        </div>

        <div className="contact-hours">
          <span>SUPPORT HOURS</span>

          <p>Monday — Friday</p>
          <strong>10:00 AM — 7:00 PM</strong>

          <p>Saturday — Sunday</p>
          <strong>10:00 AM — 5:00 PM</strong>
        </div>

      </section>

    </div>
  );
};

export default Contact;