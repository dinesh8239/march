const express = require('express')
const connectDB = require('../config/database')
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

port = 3000

//Routes
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)




connectDB().then(() => {
    console.log("connect to db");

    app.listen(3000, () => {
        console.log(`server is running at port ${port}`);

    })

}).catch((err) => {
    console.log("db not connected");

})

