const express = require('express');
const app = express()
const cors = require('cors');
const multer = require('multer')
const upload  = multer({dest : 'uploads/'})

require('dotenv').config()
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const Fileupload = []

app.get('/api/fileanalyse' , (req , res ) =>{

    res.json(Fileupload)
})

app.post('/api/fileanalyse' , upload.single('upfile'),(req , res) => {

    const file = req.file

    Fileupload.push({
        name : file.originalname,
        type : file.mimetype,
        size : file.size
    })

    res.json({
        name : file.originalname,
        type : file.mimetype,
        size : file.size
    })

})

const port = process.env.PORT || 3333;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
