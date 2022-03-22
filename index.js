const express = require("express");
const jwt = require("jsonwebtoken");
const { findOne, getMaxListeners } = require("./model/userS");
// const bcrypt = require("bcryptjs");
const app = express();
require("./Database");
const user = require("./model/userS");
app.use(express.json());
let port = process.env.PORT || 8000;

app.post("/register", async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            res.status(400).send("every input should be added");
        }

        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const User = await user.create({
            username,
            email: email.toLowerCase(),
            password
        });

        const token = jwt.sign(
            { user_id: User._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        User.token = token;
        res.status(200).json(User);
        // res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

})

app.post("/login", async (req,res) => {
    try {
        
        const { email, password } = req.body;
        if (!(email && password)) {
            res.send("username and password is required");
        }

        const User = await user.findOne({ email });
        if (User && password === User.password) {
            const token = jwt.sign(
                { user_id: User._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            User.token = token;
            res.status(200).json(User);

        }
        res.status(400).send("Invalid Credentials");

    } catch (err) {
        console.log(err);
    }
})
app.listen(port, () => {
    console.log(`Server Running at Port: ${port}`);
})