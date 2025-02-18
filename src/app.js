const express = require('express')

const app = express();
port = 3000

app.use('/', (req, res)=> {
    res.send('can you run?')
})

app.use('/say', (req, res) =>{
    res.send('brain is bigger than sky')
})

app.use('/byy', (req, res) => {
    res.send('learning phase compelete Now you can do work on real time project')
})

app.listen(3000, () =>{
    console.log(`server is running at port ${port}`);
    
})