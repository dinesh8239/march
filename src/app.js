const express = require('express')

const app = express();
port = 3000

app.post('/user', (req, res) => {
    res.send('data added successfully')
})

app.get('/user', (req, res) => {
    res.send('data get successfully')
})

app.delete('/user', (req, res) => {
    res.send('data delete successfully')
})

app.listen(3000, () =>{
    console.log(`server is running at port ${port}`);
    
})