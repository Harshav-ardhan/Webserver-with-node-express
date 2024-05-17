const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents')
const cors = require('cors');
const { ErrorHandler } = require('./middleware/ErrorHandler');
//const routes= require('./routes/subdir')
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(express.static(path.join('./public')))
app.use('/subdir',express.static(path.join('./public')))

app.use(logger)
app.use('/subdir',require('./routes/subdir'))
app.use('/employee',require('./routes/api/employee'))
app.use('/',require('./routes/root'))

const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Error: The API cannot be called from this origin."));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('*',(req,res)=>{
  res.status(404);
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname,'views','404.html'))
  }
  else if(req.accepts('json')){
    res.json({"Eroor":"404 not found"})
  }
  else{
    res.type('txt').send('404 not found')
  }
})
app.use(ErrorHandler)

app.listen(PORT, () => console.log(`Your server is running on ${PORT}`));
