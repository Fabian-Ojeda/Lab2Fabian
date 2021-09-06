const express = require('express');
const cors = require('cors');
const exec = require('child_process').exec
const axios = require('axios');
const multer = require('multer');
const mimeTypes = require('mime-types')
const fs = require ('fs')

const storage = multer.diskStorage({
    destination: 'ups/',
    filename: function(req, file, cb){
        //console.log(Buffer.from(file).toString('base64'));
        cb("","img.jpg")
    }
})

const formData = require('form-data')

const upload = multer({
   storage: storage})

const app = express();

app.use("/static", express.static("static"));
/*
let data = formData();
data.append('file', file, file.fileName);*/

/*fs.readFile('./ups/imgLoad.jpeg', function(err, data) {
    if (err) throw err; // Fail if the file can't be read.
    
    console.log('Se leyo la imagen/');
  });


  function getBase64FomFile(img){
    let fileReader = new FileReader();
    var out = fileReader.readAsDataURL(img);
    console.log(out)
  }


  getBase64FromFile(file, function(base64){
    console.log(base64)
  });
*/

function convertImageto64(){
    exec('sh convertImage64.sh');
    console.log("se ha ejecutado el script")
}



function readIageInCode(){
    var base64 = '';

    fs.readFile('.ups/imgIncode.txt', 'utf8', (error, datos) => {
        if (error) throw error;
        base64= datos;
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



app.post('/sendImage/', upload.single('avatar') ,(req, res)=>{
    res.send('chimba')
    console.log('disque llego')
    convertImageto64()
    //restartServer(req.params.serverid);
  })

app.listen(4000, () => {
    console.log('Client running on http://localhost:4000')
});