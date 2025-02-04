import React from 'react'
import './footer.css'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()

    const hanldeClick = ()=> {
        navigate('/my-passes')
    }

    return (
        <footer class="footer" id="contact">
                <div class="section__container footer__container">
                    <div class="footer__col">
                        <h4>QUICK LINKS</h4>
                        <ul class="footer__links">
                            <li><a href="/reservation">My Reservation</a></li>
                            <li><a href="#">View Room</a></li>
                            <li><a href="/user/profile">Manage Profile</a></li>
                        </ul>
                    </div>
                    <div class="footer__col">
                        <h4>OUR SERVICES</h4>
                        <ul class="footer__links">
                            <li><a href="/complaints">Complaints</a></li>
                            <li onClick={hanldeClick}><a href="">Gatepass</a></li>
                            <li><a href="/mess">Mess Card</a></li>
                        </ul>
                    </div>
                    <div class="footer__col">
                        <h4>CONTACT US</h4>
                        <ul class="footer__links">
                            <li><a href="#">hostelsync@info.com</a></li>
                        </ul>
                        <div class="footer__socials">
                            <a href="#"><img src="/instagram.png" alt="insta" /></a>
                            <a href="#"><img src="/facebook.png" alt="facebook" /></a>
                            <a href="#"><img src="/twitter.png" alt="twitter" /></a>
                            <a href="#"><img src="/youtube.png" alt="youtube" /></a>
                        </div>
                    </div>
                </div>
                <div class="footer__bar">
                    Copyright © 2023 Web Design Mastery. All rights reserved.
                </div>
            </footer>
    )
}

export default Footer
