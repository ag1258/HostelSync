import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
// const announcements = [
//   {
//     title: "Campus Maintenance Alert",
//     description: "Scheduled power outage on Sunday from 10 AM to 4 PM for maintenance work."
//   },
//   {
//     title: "Sports Week Announcement",
//     description: "Sports Week will begin on 15th December. Register your teams by 10th December."
//   },
//   {
//     title: "Library Timing Update",
//     description: "Library will remain open from 8 AM to 8 PM during the exam period."
//   },
//   {
//     title: "Mess Menu Update",
//     description: "Special dinner menu will be served on 25th December for Christmas celebrations."
//   },
//   {
//     title: "Health Checkup Camp",
//     description: "Free health checkup camp on 20th December in the main hall from 9 AM to 2 PM."
//   },
//   {
//     title: "Lost & Found Drive",
//     description: "Lost and Found Drive will take place this Friday at the administrative block."
//   },
//   {
//     title: "Exam Hall Allocation",
//     description: "Exam hall seating arrangements have been updated. Check your emails for details."
//   },
//   {
//     title: "Winter Vacation Notice",
//     description: "Winter vacations will commence from 24th December to 2nd January."
//   },
//   {
//     title: "Anti-Ragging Seminar",
//     description: "An anti-ragging seminar will be conducted on 18th December at the auditorium."
//   },
//   {
//     title: "Hostel Cleaning Drive",
//     description: "Hostel cleaning drive on 16th December. Please cooperate with staff during this period."
//   }
// ];

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get('http://localhost:3005/announcements');
                setAnnouncements(response.data);
            } catch (error) {
                setError('Failed to fetch announcements');
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return <div className="text-center m-5">Loading announcements...</div>;
    }

    if (error) {
        return <div className="text-center m-5 text-red-500">{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-[500px] justify-center flex space-x-2 my-5">
                {/* Left-side image */}
                {/* <div className="sticky w-[500px] min-h-[300px] mx-[100px]">
                    <img src="/announcements.jpg" alt="Announcements" className="sticky h-[500px] w-[600px] top-0" />
                </div> */}

                {/* Announcements List */}
                <div>
                    <h1 className="text-2xl font-bold mb-4 mx-[18px] text-primary">Announcements</h1>

                    {announcements.length > 0 ? (
                        announcements.map((announcement) => (
                            <div
                                key={announcement._id}
                                className="announcement-box flex flex-col md:flex-row justify-between m-5 p-5 bg-gray-200 rounded-lg shadow-md text-black w-[850px]"
                            >
                                {/* Left Section */}
                                <div className="left-side w-[600px] md:w-1/2">
                                    <p className="mb-2">
                                        <strong>Title:</strong> {announcement.title}
                                    </p>
                                    <p>
                                        <strong>Description:</strong> {announcement.description}
                                    </p>
                                </div>

                                {/* Right Section */}
                                <div className="right-side w-full md:w-1/2 flex flex-col items-center justify-center md:items-end">
                                    <p>
                                        <strong>Date:</strong>{' '}
                                        {new Date(announcement.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No announcements available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Announcements;
