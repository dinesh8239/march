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


profileRouter.patch('/profile/forgotPassword', userAuth, async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User with this email does not exist.');
        }

        const resetToken = jwt.sign({ _id: user._id }, "march@2025$790", { expiresIn: '1h' });

        const resetUrl = `http://yourfrontend.com/reset-password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'potte7866@gmail.com', 
                pass: 'Harry@123',  
            }
        });

        const mailOptions = {
            from: 'potte7866@gmail.com',
            to: 'potte7866@gmail.com',
            subject: 'Password Reset Request',
            text: `reset your password`
        };

        await transporter.sendMail(mailOptions);

        res.json({
            message: 'Password reset link has been sent to your email.'
        });

    } catch (err) {
        console.log(err);
        res.status(400).send('ERROR: ' + err.message);
    }
});



module.exports = profileRouter

