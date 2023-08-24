const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretkey";

app.get("/", (req, res) => {
    res.json({
        messege: "a sample api"
    })
})

app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "atish",
        email: "atish@123"
    }


    jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
        res.json({
            token
        })
    })
})

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.send({ result: "invalid token" })
        } else {
            res.json({
                messege: "profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({
            result: 'Token is not valid'
        })
    }
}


app.listen(4000, () => {
    console.log("app is running");
});