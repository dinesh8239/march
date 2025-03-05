const express = require('express')
const { userAuth } = require('../../middlewares/auth');
const { validateEditoProfileData } = require('../utils/validation')
const nodemailer = require('nodemailer');
const User = require('../../model/user')
var jwt = require('jsonwebtoken');



const profileRouter = express()

profileRouter.get('/profile', userAuth, async (req, res) => {

    try {
        const user = req.user



        res.send(user);


    } catch (err) {
        console.log(err);

        res.status(500).send('ERROR: ' + err.message)
    }

})


profileRouter.post('/profile/edit', userAuth, async (req, res) => {

    try {
        if (!validateEditoProfileData(req)) {
            throw new Error("Invalid Edit Request")
        }

            const loggedInUser = req.user;
            
            
            Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
            
            
            // await loggedInUser.save();
            
            res.json({
           message: `${loggedInUser.firstName}, your profile update successfully`,
           data: loggedInUser
           

        })
            // console.log(data);
            
        
        } catch (err) {
        console.log(err);
        
        res.status(400).send('ERROR : ' + err.message)
    }
})






module.exports = profileRouter

