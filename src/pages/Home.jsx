import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./Homepage.css";

const destinations = [
  {
    name: "Manali, Himachal Pradesh",
    description:
      "A beautiful hill station with scenic mountains and adventure sports.",
    image: "https://www.holidify.com/images/bgImages/MANALI.jpg",
    background: "https://www.holidify.com/images/bgImages/MANALI.jpg",
  },
  {
    name: "Jaipur, Rajasthan",
    description:
      "The Pink City known for its rich heritage and royal architecture.",
    image: "https://www.holidify.com/images/bgImages/JAIPUR.jpg",
    background: "https://www.holidify.com/images/bgImages/JAIPUR.jpg",
  },
  {
    name: "Goa",
    description: "Famous for beaches, nightlife, and Portuguese influence.",
    image: "https://www.holidify.com/images/bgImages/GOA.jpg",
    background: "https://www.holidify.com/images/bgImages/GOA.jpg",
  },
  {
    name: "Varanasi, Uttar Pradesh",
    description:
      "The spiritual heart of India, known for Ganga Aarti and temples.",
    image: "https://www.holidify.com/images/bgImages/VARANASI.jpg",
    background: "https://www.holidify.com/images/bgImages/VARANASI.jpg",
  },
  {
    name: "Munnar, Kerala",
    description:
      "A serene hill station with tea gardens and lush green landscapes.",
    image: "https://www.holidify.com/images/bgImages/MUNNAR.jpg",
    background: "https://www.holidify.com/images/bgImages/MUNNAR.jpg",
  },
  {
    name: "Rishikesh, Uttarakhand",
    description: "Adventure and spirituality along the Ganges River.",
    image: "https://www.holidify.com/images/bgImages/RISHIKESH.jpg",
    background: "https://www.holidify.com/images/bgImages/RISHIKESH.jpg",
  },
];

const TravelPlannerSlider = () => {
  const [bgImage, setBgImage] = useState(destinations[0].background);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();

  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex;
    setBgImage(destinations[index].background);
  };

  return (
    <>
      <div
        className="magic-slider"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="background-overlay">
          <header className="navbar">
            <div className="logo">Travel Planner</div>
            <div className="auth-buttons">
              <button
                className="auth-button"
                onClick={() => setShowLogin(true)}
              >
                {" "}
                Login{" "}
              </button>
              <button
                className="auth-button signup"
                onClick={() => setShowSignup(true)}
              >
                {" "}
                Sign Up{" "}
              </button>
            </div>
          </header>

          <div className="hero-text">
            <h1>EXPLORE YOUR NEXT ADVENTURE</h1>
            <h2 className="subheading">Plan Memorable Journeys</h2>
            <button className="cta-button" onClick={() => navigate("/Planner")}>
              Start Planning
            </button>
          </div>

          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            onSlideChange={handleSlideChange}
            className="card-slider"
            modules={[Autoplay]}
          >
            {destinations.map((dest, index) => (
              <SwiperSlide key={index}>
                <div className="destination-card">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="destination-image"
                  />
                  <h3>{dest.name}</h3>
                  <p>{dest.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Floating Menu */}
          <div className="floating-menu">
            <ion-icon name="home-outline"></ion-icon>
            <ion-icon
              name="information-circle-outline"
              onClick={() => navigate("/About")}
            ></ion-icon>
            <ion-icon
              name="airplane-outline"
              onClick={() => navigate("/Planner")}
            ></ion-icon>
            <ion-icon
              name="mail-outline"
              onClick={() => navigate("/Contact")}
            ></ion-icon>
            <ion-icon
              name="map-outline"
              onClick={() => navigate("/GoogleMapComponent")}
              style={{ cursor: "pointer" }}
            ></ion-icon>
          </div>

          {/* Login Modal */}
          {showLogin && (
            <div className="modal-overlay" onClick={() => setShowLogin(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2>Login</h2>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="modal-submit">Login</button>
                <button
                  className="modal-close"
                  onClick={() => setShowLogin(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Sign Up Modal */}
          {showSignup && (
            <div className="modal-overlay" onClick={() => setShowSignup(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2>Sign Up</h2>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="modal-submit">Sign Up</button>
                <button
                  className="modal-close"
                  onClick={() => setShowSignup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TravelPlannerSlider;
