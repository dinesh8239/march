const express = require('express');
const userRouter = express();
const { userAuth } = require('../../middlewares/auth');
const ConnectionRequest = require('../../model/connectionRequest');
const User = require('../../model/user')
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the accepted connections for the loggedIn user
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        console.log("Logged in user: ", loggedInUser);

        // Fetch connection requests where the status is 'accepted' and the user is either 'fromUserId' or 'toUserId'
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ],
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        console.log("Connection requests: ", connectionRequests);

        // Map the connection requests to return only the connected user data
        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId; // Return the 'toUserId' if the logged-in user is the 'fromUserId'
            }
            return row.fromUserId; // Return the 'fromUserId' if the logged-in user is the 'toUserId'
        });

        // Send the final response with connection data
        res.json({
            message: "Connections fetched successfully",
            data
        });

    } catch (err) {
        console.log("Error: ", err);
        res.status(400).send({ message: 'ERROR: ' + err.message });
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        //find all connection requests (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })
        console.log(hideUserFromFeed);

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        res.send(users);
        res.send(connectionRequests)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = userRouter;
