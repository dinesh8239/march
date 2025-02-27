const express = require('express')
const { userAuth } = require('../../middlewares/auth');


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



module.exports = profileRouter;