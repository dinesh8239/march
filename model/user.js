const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({

    firstName: {
        type: String,
        minLength: 2,
        maxLength: 15,
        lowercase: true,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }

        }
    },
    photoUrl: {
        type: String,
        default: "https://as2.ftcdn.net/v2/jpg/02/44/43/69/1000_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
    },
    skills: {
        type: [String]
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);




