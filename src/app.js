const express = require('express')

const app = express();
port = 3000

app.post('/user', (req, res) => {
    console.log(req.query);
    
    res.send('data added successfully')
})

app.get('/user/:userId/:Name/:city', (req, res) => {
console.log(req.params);

    res.send('data get successfully')
})

app.listen(3000, () =>{
    console.log(`server is running at port ${port}`);
    
})