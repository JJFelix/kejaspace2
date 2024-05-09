import React from 'react';
import './Footer.css'
import '../assets/react.svg'
import { Link } from 'react-router-dom';
function Footer() {
    const profileImage = '/images/profile.jpeg'
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-logo d-flex align-items-center">
                    <img src={profileImage} alt="Logo" />
                    <h1>Keja Space</h1>
                </div>
                <div className="footer-links">
                    <ul>
                        <li><Link to={'/about'} className={'nav-link'}>About</Link></li>
                        <li><Link to={'/contact'} className={'nav-link'}>Contact Us</Link></li>
                        <li><Link to={'/policy'} className={'nav-link'}>Our Policy</Link></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <Link to={'https://facebook.com/KejaSpace'}><i className="fab fa-facebook"></i></Link>
                    <Link to={'https://twitter.com/KejaSpace'}><i className="fab fa-twitter"></i></Link>
                    <Link to={'https://instagram.com/KejaSpace'}><i className="fab fa-instagram"></i></Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
