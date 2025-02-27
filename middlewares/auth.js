const jwt = require('jsonwebtoken')
const User = require('../model/user')
const userAuth = async (req, res, next) => {
try{
    const { token } = req.cookies
    if (!token) {
        throw new Error('Token is not valid!!')
    }

    const decodedObj = await jwt.verify(token, "march@2025$790")

    const { _id } = decodedObj
    const user = await User.findById(_id).lean();
    if (!user) {
        throw new Error('User does not exist');
    }
    
    res.send(user);
    

    req.user = user;
    next();
} catch (err) {
    res.status(400).send('"ERRPR: ' + err.message)
}
}

module.exports = {
    userAuth
}