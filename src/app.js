const express = require('express')

const app = express();
port = 3000

const {adminAuth, userAuth} = require('../middlewares/auth')
app.use("/admin", adminAuth)

app.post('/user', userAuth, (req, res) => {
    res.send('data added successfully')

})

app.get('/admin/getAllData', (req, res) => {
    res.send('data getting success')

})

app.get('/admin/delete', (req, res) => {
    res.send('delete all the data')

})


    app.listen(3000, () => {
        console.log(`server is running at port ${port}`);

    })