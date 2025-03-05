const express = require('express');
const { userAuth } = require('../../middlewares/auth');
const requestRouter = express()
const ConnectionRequest = require('../../model/connectionRequest')
const User = require('../../model/user')



requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {

    try {


        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const isAllowedStatus = ["ignore", "intereseted"]
        if (!isAllowedStatus.includes(status)) {

            return res.status(400).json({
                message: "Invalid status type: " + status
            })
        }

        const toUser = await User.findById(toUserId)
        if (!toUser) {
            res.status(404).json({ message: "User not found" })
        }

        const existingConncectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (existingConncectionRequest) {
            return res.status(400).send({ message: "Connection Request Already Exists" })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save()

        res.json({
            message: req.user.firstName + " is " + status + " " + toUser.firstName,
            data,
        })

    } catch (err) {
        res.status(400).send(`ERROR: ${err.message}`)
    }

})

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        console.log(loggedInUser);
        const { status, requestId } = req.params;
        console.log(req.params);


        const allowedStatus = ["accepeted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed" });
        }

        const connectionRequest = await ConnectionRequest.findOne({

            _id: requestId,
            toUserId: loggedInUser._id,
            status: "intereseted"
        })

        if (!connectionRequest) {
            console.log(connectionRequest)
            return res.status(404).json({ message: "Connection request not found" });
        }

        // Update the status of the connection request
        connectionRequest.status = status;

        const data = await connectionRequest.save();
        console.log(data);

        res.json({
            message: "Connection Request successfully " + status, data
        });

    } catch (err) {
        console.log(err);
        res.status(400).send(`ERROR: ${err.message}`);
    }
});


module.exports = requestRouter;