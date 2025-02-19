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

//find user by emailID
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId

    try {
        const users = await User.find({emailId: userEmail})
        if (users.length=== 0) {
            res.status(404).send('user not found')
        } else {

            res.send(users)
        }


    } catch (err) {
        res.status(500).send('something went wrong')
    }

})

//find all users
app.get('/feed', async(req, res) => {
    try{
       const users = await User.find({})
    
        res.send(users)

    }catch(err){
        res.status(400).send('something went wrong')
    }
})

//findOne user
app.get('/test', async(req, res) => {
    const userEmail = req.body.emailId
    try{
        const user = await User.findOne({emailId: userEmail})
        if(!user){
            res.status(404).send('user not found')
        }else{
            
            res.send(user)
        }
    }catch{
        res.status(400).send('something went wrong')
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

