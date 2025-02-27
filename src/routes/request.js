const express = require('express');
const { userAuth } = require('../../middlewares/auth');
const requestRouter = express()



requestRouter.post('/sendConnectionRequest', userAuth, async (req, res) =>{

    console.log('send request successfully');
    res.send(user.firstName + 'sent the connect request')
})


module.exports = requestRouter;