import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentFooter = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/my-passes');
    };

    return (
        <footer className="bg-gray-800 text-white py-8" id="contact">
            <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                    <h4 className="text-lg font-medium mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="/me" className="text-gray-400 hover:text-white transition">
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="/gatepass" className="text-gray-400 hover:text-white transition">
                                Apply GatePass
                            </a>
                        </li>
                        <li>
                            <a href="/complaint" className="text-gray-400 hover:text-white transition">
                                Register Complaint
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-medium mb-4">Our Services</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="/complaints" className="text-gray-400 hover:text-white transition">
                                Complaints
                            </a>
                        </li>
                        <li onClick={handleClick}>
                            <a href="/my-passes" className="text-gray-400 hover:text-white transition">
                                Gatepass
                            </a>
                        </li>
                        <li>
                            <a href="/mess" className="text-gray-400 hover:text-white transition">
                                Mess Card
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-medium mb-4">Contact Us</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                hostelsync@info.com
                            </a>
                        </li>
                    </ul>
                    <div className="flex space-x-4 mt-4">
                        <a href="#">
                            <img src="/instagram.png" alt="Instagram" className="w-6 opacity-80 hover:opacity-100 transition" />
                        </a>
                        <a href="#">
                            <img src="/facebook.png" alt="Facebook" className="w-6 opacity-80 hover:opacity-100 transition" />
                        </a>
                        <a href="#">
                            <img src="/twitter.png" alt="Twitter" className="w-6 opacity-80 hover:opacity-100 transition" />
                        </a>
                        <a href="#">
                            <img src="/youtube.png" alt="YouTube" className="w-6 opacity-80 hover:opacity-100 transition" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-400 mt-8 text-sm">
                Copyright © 2023 Web Design Mastery. All rights reserved.
            </div>
        </footer>
    );
};

export default StudentFooter;
