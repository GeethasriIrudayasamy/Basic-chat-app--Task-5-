const express = require("express");
const router = express.Router();
const fs = require("fs");
let display_data;

router.get("/login", (req, res, next) => {
    res.send(
        "<form onsubmit='localStorage.setItem(`username`, document.getElementById(`username`).value)' action='/login' method='POST'><input id='username' type='text' name='username'/><button type='submit'>Login</button></form>"
    );
});
router.post("/login", (req, res, next) => {
    res.redirect("/");
});
router.get("/", (req, res, next) => {
    if (fs.existsSync("data.txt")) {
        display_data = fs.readFileSync("data.txt", "utf-8");
    } else {
        display_data = "no chats";
    }

    res.send(
        `<h3>${display_data}</h3><form onsubmit= "document.getElementById('username').value=localStorage.getItem('username')" method='POST'><input id="message" type="text" name="message" /><input type="hidden" name="username" id="username"><button type="submit">Send</button></form>`
    );
});

router.post("/", (req, res, next) => {
    const user = req.body.username;
    const message = req.body.message;
    const msgs = `${user}:${message}`;

    if (!fs.existsSync("data.txt")) {
        fs.writeFile("data.txt", msgs, (err, data) => {
            fs.readFile("data.txt", "utf-8", (err, data) => {
                display_data = data;
            });
        });
    } else {
        fs.appendFile("data.txt", msgs, (err, data) => {
            fs.readFile("data.txt", "utf-8", (err, data) => {
                display_data = data;
            });
        });
    }
    res.redirect("/");
});

module.exports = router;
