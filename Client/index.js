const express = require('express');
const cors = require('cors');
const exec = require('child_process').exec
const axios = require('axios');
const multer = require('multer');
const mimeTypes = require('mime-types')
const fs = require ('fs')
const fetch = require('fetch')
const querystring = require('querystring');
const url = require('url');
const qs = require('qs');
const FormData = require('form-data');

const storage = multer.diskStorage({
    destination: 'ups/',
    filename: function(req, file, cb){
        //console.log(Buffer.from(file).toString('base64'));
        cb("","img.jpg")
    }
})
var formData = []


var data64 = '';

const upload = multer({
   storage: storage})

const app = express();

app.use("/static", express.static("static"));




function sendFinally(){
    try {  
        
    
       const form = new FormData();
       form.append('my_field', 'my value');
       //form.append('my_file', fs.createReadStream('./img/bar.jpg'));
       axios.post('http://localhost:4001/image/', form, { headers: form.getHeaders() })
       
        
    } catch (error) {
      console.error(error);
    }
  }


function convertImageto64(callback){
    exec('sh convertImage64.sh');
    setTimeout(() => {
        callback()
    }, 5000);
}



function readImageInCode(callback){
    fs.readFile('./ups/imgIncode.txt', 'utf8', (error, data) => {
        if (error) throw error;
        data64 = data        
        setTimeout(() => {
            callback()
        }, 5000);                
    });
}

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: ('*'),
                    credentials: true
                }
            ]
        }
    }
}

app.use(cors(
    config.application.cors.server
));

sendFinally()

app.post('/sendImage/', upload.single('avatar') ,(req, res)=>{
    
    

        
    
    //readImageInCode()
    //restartServer(req.params.serverid);
  })
app.listen(4000, () => {
    console.log('Client running on http://localhost:4000')
});