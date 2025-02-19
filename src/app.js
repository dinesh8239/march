const express = require('express')
const connectDB = require('../config/database')
const User = require('../model/user')
const app = express();
port = 3000

// const { adminAuth, userAuth } = require('../middlewares/auth')
// app.use("/admin", adminAuth)

app.post('/signup', (req, res) => {
    const user = new User({
        firstName: "Shree Ramchandra",
        lastName: "dasharath putr",
        emailId: "ram99@gmail.com",
        age: 0,
        password: "12345567890",
    })
    user.save();
    res.send("data post successfully")
})


connectDB().then(() => {
    console.log("connect to db");

    app.listen(3000, () => {
        console.log(`server is running at port ${port}`);

    })

}).catch((err) => {
    console.log("db not connected");

})

