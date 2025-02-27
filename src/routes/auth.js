const express = require('express')
const authRouter = express()
const { validateSchemaUpdate } = require('../utils/validation')
const { userAuth } = require('../../middlewares/auth');
const User = require('../../model/user')
const bcrypt = require('bcrypt')


authRouter.post('/signup', async (req, res) => {
    // console.log(req.body);

    try {
        validateSchemaUpdate(req);
        const { firstName, lastName, emailId, password } = req.body

        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);


        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword,
            // skills
        })
        console.log(user);

        await user.save();
        res.send("data post successfully")

    } catch (err) {
        console.log(err);

        res.status(500).send('ERROR: ' + err.message)
    }

})


authRouter.post('/login',async (req, res) => {

    try {
        const { emailId, password } = req.body

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            console.log('User not found with email:', emailId);
            throw new Error('Email is not present in the db')
        }

        const isAllowedPassword = await bcrypt.compare(password, user.password);
        if (isAllowedPassword) {

            const token = await user.getJWT()
            console.log(token);

            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true })

            res.send('login successfully')

        } else {
            res.status(400).send('Incorrect password')
        }

    } catch (err) {
        console.log(err);

        res.status(500).send('ERROR: ' + err.message)
    }

})

module.exports = authRouter;