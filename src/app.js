const express = require('express')

const app = express();
port = 3000

app.post('/user', (req, res, next) => {
    console.log('fdfd');
    // res.send('data added successfully')
    next()
},
  (req, res, next) => {
        console.log('ksksk');
        // res.send('data succeed')

        next()
    },
    (req, res, next) => {
        console.log('hfhfhf');
        // res.send('data get it')
        next()
    },
    (req, res, next) => {
        console.log('rururu');
        // res.send('data aago')
        next()
    }

)


    app.listen(3000, () => {
        console.log(`server is running at port ${port}`);

    })