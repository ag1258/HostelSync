import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const ProfilePage = () => {
    const [user, setUser] = useState(null); 
    const [dataSource, setDataSource] = useState(null); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:3005/student/me", {
                    withCredentials: true, 
                });

                setUser(response.data.user);
                setDataSource(response.data.dataSource);
            } catch (err) {
                setError("Failed to fetch user details.");
            }
        };

        fetchUser();
    }, []);

    if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;
    if (!user) return <p className="text-center text-lg mt-5">Loading...</p>;

    return (
        <>

        <Navbar/>

        <div className="min-h-screen  flex justify-center">
            <div className="bg-gray-100 shadow-lg rounded-lg p-8 max-w-4xl w-full h-[530px]">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Welcome, {dataSource === "user" ? user.name : `${user.firstName} ${user.lastName}`}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* General Information */}
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-700">General Information</h2>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <strong>Email:</strong> {user.email}
                            </li>
                            <li>
                                <strong>Enrollment {dataSource === "user" ? "ID" : "Number"}:</strong>{" "}
                                {dataSource === "user" ? user.enrollmentID : user.enrollmentNumber}
                            </li>
                            {dataSource === "reservation" && (
                                <li>
                                    <strong>Phone:</strong> {user.phone}
                                </li>
                            )}
                            {dataSource === "reservation" && (
                                <li>
                                    <strong>Gender:</strong> {user.gender}
                                </li>
                            )}
                        </ul>

                        {dataSource === "reservation" && (
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold text-gray-700">Hostel Information</h2>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <strong>Hostel Name:</strong> {user.hostelname}
                                    </li>
                                    <li>
                                        <strong>Room Type:</strong> {user.roomtype}
                                    </li>
                                    <li>
                                        <strong>Room Seater:</strong> {user.roomseater}
                                    </li>
                                    <li>
                                        <strong>Room Floor:</strong> {user.roomfloor}
                                    </li>
                                    <li>
                                        <strong>Address:</strong> {user.address}, {user.city}, {user.state},{" "}
                                        {user.country}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-center items-center">
                        <img
                            src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                            alt="User avatar"
                            className="w-40 h-40 rounded-full border-2 border-gray-200"
                        />
                    </div>
                </div>
            </div>
        </div>

        <Footer/>

        </>
    );
};

export default ProfilePage;
