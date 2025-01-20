const setCookies = (req, res, next) => {
    const { token, userDetails } = req.body; // Ensure this data is sent from the login route

    if (token) {
        res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    }

    if (userDetails) {
        res.cookie("userDetails", userDetails, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    }

    next();
};

module.exports = setCookies; 