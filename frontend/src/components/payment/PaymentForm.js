import React, { useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const PaymentForm = () => {
    const [responseId, setResponseId] = React.useState("");
    const [responseState, setResponseState] = React.useState([]);

    // Load Razorpay script
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Save `responseId` to local storage whenever it changes
    useEffect(() => {
        if (responseId) {
            localStorage.setItem("responseId", responseId);
        }
    }, [responseId]);

    // Check local storage for `responseId` on component mount
    useEffect(() => {
        const storedResponseId = localStorage.getItem("responseId");
        if (storedResponseId) {
            setResponseId(storedResponseId);
        }
    }, []);

    const createRazorpayOrder = (amount) => {
        const data = JSON.stringify({
            amount: amount * 100,
            currency: "INR",
        });

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3005/orders",
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                handleRazorpayScreen(response.data.amount);
            })
            .catch((error) => {
                console.error("Error creating Razorpay order:", error);
            });
    };

    const handleRazorpayScreen = async (amount) => {
        const res = await loadScript("http://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Failed to load Razorpay screen");
            return;
        }

        const options = {
            key: "rzp_test_HA0dblFvRuSZ2X",
            amount: amount,
            currency: 'INR',
            name: "HostelSync",
            description: "Pay to book your room",
            image: "/nameLogo.jpg",
            handler: function (response) {
                setResponseId(response.razorpay_payment_id);
            },
            prefill: {
                name: "HostelSync",
                email: "hostelsync@gmail.com",
            },
            theme: {
                color: "#bc1c5c",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const paymentFetch = (e) => {
        e.preventDefault();

        const paymentId = e.target.paymentId.value;

        axios
            .get(`http://localhost:3005/payment/${paymentId}`)
            .then((response) => {
                console.log(response.data);
                setResponseState(response.data);
            })
            .catch((error) => {
                console.error("Error fetching payment details:", error);
            });
    };

    return (
        <>
            <Navbar />

            <div className="min-h-[500px] flex mb-6 justify-center">
                <div className="Payment w-[1000px] ml-[150px] p-3 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-semibold text-primary mb-6">Payment Verification</h1>

                    <div className="p-6 max-w-3xl">
                        <ul className="space-y-4">
                            <li>
                                <h3 className="text-xl font-semibold">Hostel Fee Includes:</h3>
                                <p className="text-gray-700 text-base">
                                    Accommodation charges (AC/non-AC), mess food, laundry, and access to shared
                                    facilities like fridge and microwave on alternate floors.
                                </p>
                            </li>
                            <li>
                                <h3 className="text-xl font-semibold">Hostel Facilities:</h3>
                                <p className="text-gray-700 text-base">
                                    Mess (for meals), Wi-Fi, laundry, fridge, microwave, and common areas for recreation
                                    and study.
                                </p>
                            </li>
                            <li>
                                <h3 className="text-xl font-semibold">Things Allowed in Hostel:</h3>
                                <p className="text-gray-700 text-base">
                                    Personal items (clothing, toiletries), small appliances (alarm clock, laptops), and
                                    snacks.
                                </p> 
                            </li>
                            <li>
                                <h3 className="text-xl font-semibold">Things Not Allowed in Hostel:</h3>
                                <p className="text-gray-700 text-base">
                                    High-energy electrical appliances (e.g., personal iron, heaters), alcohol, pets, and
                                    weapons.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center bg-gray-200 rounded-lg p-4 mx-6 min-h-[80px] justify-between">
                        {responseId ? (
                            <p className="text-lg font-medium text-green-600 ml-[320px]">Room booking confirmed!</p>
                        ) : (
                            <>
                                <h3 className="text-xl font-semibold text-primary">₹55,000</h3>
                                <button
                                    onClick={() => createRazorpayOrder(55000)}
                                    className="px-6 py-3 bg-primary text-white font-bold rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                                >
                                    Pay Now
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="Payment max-w-4xl mx-auto p-6 shadow-lg rounded-lg bg-gray-200 min-h-[200px]">
                    <h2 className="text-2xl text-center font-semibold text-gray-700 mb-4 min-w-[300px]">
                        Print fee payment receipt
                    </h2>

                    {responseId && (
                        <p className="text-center font-medium mb-4">
                            Payment ID:<span className="text-primary-dark ml-[16px]">{` ${responseId}`}</span>
                        </p>
                    )}

                    <form onSubmit={paymentFetch} className="w-full max-w-md mx-auto space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="paymentId" className="text-sm font-semibold text-gray-600">
                                Payment ID
                            </label>
                            <input
                                type="text"
                                name="paymentId"
                                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-primary-dark"
                                required
                                placeholder="Enter Payment ID"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                            >
                                Print
                            </button>
                        </div>
                    </form>

                    {responseState.length !== 0 ? (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <ul className="space-y-2">
                                <li className="text-gray-700">
                                    <strong>Amount:</strong> {responseState.amount / 100} Rs.
                                </li>
                                <li className="text-gray-700">
                                    <strong>Currency:</strong> {responseState.currency}
                                </li>
                                <li className="text-gray-700">
                                    <strong>Status:</strong> {responseState.status}
                                </li>
                                <li className="text-gray-700">
                                    <strong>Method:</strong> {responseState.method}
                                </li>
                                <li className="text-gray-700">
                                    <strong>Date:</strong> {format(new Date(), 'dd/MM/yyyy')}
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="mt-6 flex justify-center">
                            <img
                                src="/about.jpg"
                                alt="Sample"
                                className="rounded-lg shadow-md w-[250px]"
                            />
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default PaymentForm;
