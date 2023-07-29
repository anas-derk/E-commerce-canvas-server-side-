function createNewUser(req, res) {
    const email = req.body.email.toLowerCase(),
        password = req.body.password,
        country = req.body.country;
    // Start Handle Email Value To Check It Before Save In DB
    const { isEmail } = require("../global/functions");
    // Check If Email, Password And Country Are Exist
    if (email.length > 0 && password.length > 0 && country.length > 0) {
        // Check If Email Valid
        if (isEmail(email)) {
            const { createNewUser } = require("../models/users.model");
            // Create New User
            createNewUser(email, password, country).then((msg) => {
                res.json(msg);
            })
            .catch((err) => res.json(err));
        }
        else {
            // Return Error Msg If Email Is Not Valid
            res.status(500).json("Error, This Is Not Email Valid !!");
        }
    } else {
        res.status(500).json("Error, Please Enter Email And Password Or Rest Input !!");
    }
}

function login(req, res) {
    let email = req.query.email.toLowerCase(),
        password = req.query.password;
    console.log(email, password);
    // Start Handle Email Value To Check It Before Save In DB
    const { isEmail } = require("../global/functions");
    // Check If Email And Password Are Exist
    if (email.length > 0 && password.length > 0) {
        // Check If Email Valid
        if (isEmail(email)) {
            const { login } = require("../models/users.model");
            login(email, password).then((result) => {
                res.json(result);
            })
                .catch((err) => res.json(err));
        } else {
            // Return Error Msg If Email Is Not Valid
            res.status(500).json("Error, This Is Not Email Valid !!");
        }
    } else {
        res.status(500).json("Error, Please Enter Email And Password Or Rest Input !!");
    }
}

function getUserInfo(req, res) {
    let userId = req.params.userId;
    if (!userId) res.status(500).json("Sorry, Please Send User Id !!");
    else {
        const { getUserInfo } = require("../models/users.model");
        getUserInfo(userId).then((user) => {
            res.json(user);
        })
        .catch((err) => res.json(err));
    }
}

function putUserInfo(req, res) {
    const userId = req.params.userId;
    const newUserData = req.body;
    if (!userId || Object.keys(newUserData).length === 0) res.status(500).json("Sorry, Please Send User Id And New User Data !!");
    else {
        const { updateUserInfo } = require("../models/users.model");
        updateUserInfo(userId, newUserData).then((result) => {
            res.json(result);
        })
        .catch((err) => res.json(err));
    }
}

module.exports = {
    createNewUser,
    login,
    getUserInfo,
    putUserInfo,
}