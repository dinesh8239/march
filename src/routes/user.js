const express = require('express')
const userRouter = express()
const { userAuth } = require('../../middlewares/auth')
const ConnectionRequest = require('../../model/connectionRequest')

userRouter.get('/user/requests/received', userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user
        console.log(loggedInUser);

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "intereseted"

        })
            .populate("fromUserId", ['firstName', 'lastName'])


        res.json({
            message: "data fetched successfully",
            data: connectionRequests
        })

    } catch (err) {
        console.log(err);

        res.status(400).send({ message: 'ERRROR' + err.message })
    }
})



module.exports = userRouter