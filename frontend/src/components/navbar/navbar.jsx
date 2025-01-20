import React from 'react'
import './navbar.css'
import {Link, NavLink} from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav>
                    <div class="nav__bar">
                        <div class="logo">
                            <a href="#"><img src="/nameLogo.jpg" alt="logo" /></a>
                        </div>
                        <div class="nav__menu__btn" id="menu-btn">
                            <i class="ri-menu-line"></i>
                        </div>
                    </div>
                    <ul class="nav_links" id="nav-links">
                        <Link to = '/user'><li><a href="#home">Home</a></li></Link>
                        <Link to = '/announcements'><li><a href="#about">Announcements</a></li></Link>
                        <Link to = "/my-passes"><li><a>Gatepass</a></li></Link>
                        <Link to = '/complaints'><li><a href="#complaint">Complaint</a></li></Link>
                        <Link><li><a href="#contact">Contact</a></li></Link>
                    </ul>
                    <NavLink to="/"><button class="btn nav__btn">Logout</button></NavLink>
                </nav>
        </>
    )
}

export default Navbar
