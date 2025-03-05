import React, { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Footer from "../footer/footer";
import AdminOrUser from "../adminOrUser/adminOrUser";
import "./LandingPage.css";
import "../adminOrUser/adminOrUser.css";
import "../popup.css";
import {
  Shirt,
  Utensils,
  Wifi,
  BedDouble,
  Shield,
  Trash,
} from "lucide-react";
import bannerfirst from '../../assets/banner-1.png';

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  const [buttonPop, setButtonPop] = useState(false);

  return (
    <>
      <nav>
        <div className="nav__bar">
          <div className="logo">
            <a href="#">
              <img src="./nameLogo.jpg" alt="logo" />
            </a>
          </div>
          <div
            className="nav__menu__btn"
            id="menu-btn"
            onClick={handleMenuButtonClick}
          >
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav__links" id="nav-links" onClick={handleNavLinkClick}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#rooms">Rooms</a>
          </li>
          <li>
            <a href="#service">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="nav__btns">
          <button className="btn nav__btn" onClick={() => setButtonPop(true)}>
            Login
          </button>
        </div>
      </nav>

      <header className="header">
        <div className="black-div"></div>
        <div className="section__container header__container" id="home">
          <h1>
            Make Yourself At Home In Our <span>Hostels.</span>
          </h1>
          <p>Simple - Unique - Friendly</p>
        </div>
      </header>

      <section className="section__container about__container" id="about">
        <div className="about__content">
          <p className="section__subheader">ABOUT US</p>
          <h2 className="section__header">
            The Second home away from your house!
          </h2>
          <p className="section__description">
            With a focus on quality accommodations, personalized experiences,
            and seamless booking, our platform is dedicated to ensuring that
            every traveler embarks on their dream holiday with confidence and
            excitement.
          </p>
          <div className="about__btn">
            <button className="btn">Read More</button>
          </div>
        </div>
        <div className="about__image">
          <img src="https://cdn.dribbble.com/userupload/20239139/file/original-b146269591a8620a8a9ab8c8dcb49bc0.png?format=webp&resize=320x240&vertical=center" alt="about" />
        </div>
      </section>

      <section className="section__container room__container" id="rooms">
        <p className="section__subheader">ROOM OPTIONS AVAILABLE</p>
        <h2 className="section__header">
          The Most Memorable Stay Time Starts Here.
        </h2>
        <div className="room__grid">
          <div className="room__card">
            <div className="room__card__details">
              <h4>Common Bathrooms</h4>
              <p>
                4-Seater/3-Seater rooms with common washrooms for the hostellers
              </p>
              <h5>
                Starting from <span>₹ 60,000/Sem</span>
              </h5>
              <Link to='/CommonBath'><button className="p-3 bg-black text-white rounded-[10px] w-full">
                View Room
              </button></Link>
            </div>
          </div>
          <div className="room__card">
            <div className="room__card__details">
              <h4>Attached Bathrooms</h4>
              <p>
                4/3/2/1-Seater Rooms with personal washroom for the roomates.
              </p>
              <h5>
                Starting from <span>₹ 75,000/Sem</span>
              </h5>
              <Link to='/AttachedBath'><button className="p-3 bg-black text-white rounded-[10px] w-full">
                View Room
              </button></Link>
            </div>
          </div>
          <div className="room__card">
            <div className="room__card__details">
              <h4>AC-Rooms-Attached Bathrooms</h4>
              <p>
                4/3/2/1-Seater rooms with personal washroom and air-conditioner
                facilities.
              </p>
              <h5>
                Starting from <span>₹ 1,00,000/Sem</span>
              </h5>
              <Link to='/AcAttachedBath'><button className="p-3 bg-black text-white rounded-[10px] w-full">
                View Room
              </button></Link>
            </div>
          </div>
        </div>
      </section>
{/* --------------- BANNER ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section className="relative flex justify-center items-center py-16">
        <img src={bannerfirst} className="w-full max-w-[1200px] h-[580px] rounded-xl" alt="Banner" />
      </section>

      <section className="section__container py-16 bg-white">
        <p className="text-left text-black uppercase text-m tracking-wide flex items-center after:ml-2 after:w-10 after:h-[1px] after:bg-black">
          Our Services
        </p>
        <h2 className="text-[2.5rem] leading-snug font-extrabold text-black">
          Hotel Facilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="flex flex-col items-center bg-white border-2 border-gray-500 p-6 rounded-2xl transition duration-300">
            <Shirt className="w-14 h-14 mb-3 text-black" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Laundry</h3>
            <p className="text-gray-600 text-center">
              Hassle-free laundry service for fresh and clean clothes.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white border-2 border-gray-500 p-6 rounded-2xl transition duration-300">
            <Trash className="w-14 h-14 mb-3 text-black" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Cleaning</h3>
            <p className="text-gray-600 text-center">
              Daily room cleaning for a spotless and comfortable stay.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white border-2 border-gray-500 p-6 rounded-2xl transition duration-300">
            <Utensils className="w-14 h-14 mb-3 text-black" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Mess Food</h3>
            <p className="text-gray-600 text-center">
              Enjoy hygienic and delicious meals served daily.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white border-2 border-gray-500 p-6 rounded-2xl transition duration-300">
            <Shield className="w-14 h-14 mb-3 text-black" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Security</h3>
            <p className="text-gray-600 text-center">
              24/7 surveillance for your safety and peace of mind.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white border-2 border-gray-500 p-6 rounded-2xl transition duration-300">
            <Wifi className="w-14 h-14 mb-3 text-black" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Fibre Internet</h3>
            <p className="text-gray-600 text-center">
              High-speed internet to stay connected anytime.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white border-2 border-gray-500 p-6 rounded-2xl transition duration-300">
            <BedDouble className="w-14 h-14 mb-3 text-black" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Furnished Rooms</h3>
            <p className="text-gray-600 text-center">
              Spacious, fully furnished rooms for a cozy stay.
            </p>
          </div>
        </div>
      </section>


      <section className="section__container banner__container">
        <div className="banner__content">
          <div className="banner__card">
            <h4>800+</h4>
            <p>Rooms Available</p>
          </div>
          <div className="banner__card">
            <h4>2000+</h4>
            <p>Bookings Completed</p>
          </div>
          <div className="banner__card">
            <h4>4.6 *</h4>
            <p>Ratings</p>
          </div>
        </div>
      </section>

      <Footer />

      <AdminOrUser trigger={buttonPop}>
        <button className="close_btn" onClick={() => setButtonPop(false)}>
          Close
        </button>
      </AdminOrUser>
    </>
  );
}

export default LandingPage;
