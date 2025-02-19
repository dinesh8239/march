const express = require('express')
const connectDB = require('../config/database')
const User = require('../model/user')
const app = express();
app.use(express.json())
port = 3000

// const { adminAuth, userAuth } = require('../middlewares/auth')
// app.use("/admin", adminAuth)

app.post('/signup', async (req, res) => {
    // console.log(req.body);

    const user = new User(req.body)
    try {

        await user.save();
        res.send("data post successfully")

    } catch (err) {

        res.status(500).send('something went wrong', err)
    }

})


connectDB().then(() => {
    console.log("connect to db");

    app.listen(3000, () => {
        console.log(`server is running at port ${port}`);

    })

}).catch((err) => {
    console.log("db not connected");

})

