const express = require('express')
const connectDB = require('../config/database')
const User = require('../model/user')
const { validateSchemaUpdate } = require('./utils/validation')
const app = express();
app.use(express.json())
port = 3000



app.post('/signup', async (req, res) => {
    // console.log(req.body);

    try {
        // const data = req.body
        // if (data.skills && data.skills.length > 5) {
        //     res.status(400).send('Cannot add more than 5 skills')

        // }

        // if (data.password && data.password.length < 8) {
        //     res.status(400).send('Password should be at least 8 characters long')

        // }

        // if (data.age && data.age < 18) {
        //     res.status(400).send('Age must be at least 18 years old')
        // }

        // const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        // if (data.emailId && !emailRegex.test(data.emailId)) {
        //     return res.status(400).send('Invalid email format');
        // }

        validateSchemaUpdate(req);

        const user = new User(req.body)
        console.log(user);

        await user.save();
        res.send("data post successfully")

    } catch (err) {
        console.log(err);

        res.status(500).send('ERROR: ' + err.message)
    }

})

//find user by emailID
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId

    try {
        const users = await User.find({ emailId: userEmail })
        if (users.length === 0) {
            res.status(404).send('user not found')
        } else {

            res.send(users)
        }


    } catch (err) {
        res.status(500).send('something went wrong')
    }

})

//find all users
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})

        res.send(users)

    } catch (err) {
        res.status(400).send('something went wrong')
    }
})

//findOne user
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId
    try {
        const user = await User.findOne({ emailId: userEmail })
        if (!user) {
            res.status(404).send('user not found')
        } else {

            res.send(user)
        }
    } catch {
        res.status(400).send('something went wrong')
    }

})

//delete user
// app.delete('/delete', async (req, res) => {
//     const userDelete = req.body._id

//     try {
//         const users = await User.deleteOne({ _id: userDelete })
//         if (users) {
//             res.status(404).send('user Not deleted')
//         } else {
//             res.send(users)
//         }

//     } catch {
//         res.status(501).send('something went wrong')
//     }

// })

app.delete('/user', async (req, res) => {
    const userId = req.body._id
    // const userId = req.body.userId

    try {
        await User.findByIdAndDelete({ _id: userId })
        //   await User.findByIdAndDelete(userId)
        res.send('user deleted successfully')

    } catch (err) {
        res.status(501).send('something went wrong')
    }
})

app.patch('/user/:userId', async (req, res) => {
    console.log(req.body);

    try {
        const userId = req.params.userId
        const data = req.body
        const ALLOWED_UPDATES = ['skills', 'gender', 'age', 'photoUrl']

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Updates not allowed");
        }

        if (data.skills.length > 5) {

            throw new Error('can not add more than 5 skills')
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data)
        console.log(user);

        res.send('user updated successfully')
    } catch (err) {
        console.log(err);

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

