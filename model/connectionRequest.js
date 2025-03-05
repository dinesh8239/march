const mongoose = require('mongoose')

const connectonRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //reference to User collection
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignore", "intereseted", "accepeted", "rejected"],
            message: `{value} is incorrect status type`
        }
    }
},
    { timestamps: true }

);

connectonRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //Check if the fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {

        return next(new Error("Cannot send connection request to yourself"));

    }
    next()

})


const connectonRequestModel = new mongoose.model(
    "connectionRequest", connectonRequestSchema
);

module.exports = connectonRequestModel