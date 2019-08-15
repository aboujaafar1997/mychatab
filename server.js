    var express = require('express');  
var  socket= require('socket.io'); 
const bodyParser = require('body-parser');
var fs = require('fs');
var app = express();



console.log("***************historique***************")

// var server=app.listen(4000,()=>{
//     console.log("run server in port 4000 ...");
// });
var port = process.env.PORT || 3000;
 var server= app.listen(port,function(){
    console.log("run server in port"+port);
});


//medlweares
app.use(express.static('public'));
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use('/uploads',express.static(__dirname + '/sound'));
//route
app.get("/aa",function(){
    res.render("public/index.html")
});

//io
var io =socket(server);
var users=["0x0111",'0x3000'];
io.on("connection",(socket)=>{

console.log("hey its one plus online id : "+socket.id );

socket.on('online',(data)=>{
    console.log(data+': online');
    users.push(data);
    console.log(users);
    io.sockets.emit('online2',users);
    });
    /********************users chat messa*************** */
socket.on('chat',(data)=>{
io.sockets.emit('chatrom',data);
console.log("data passed : "+data.message);
});
//***********************user typing*************************** */
socket.on('typ',(data)=>{
    socket.broadcast.emit('typ',data);
    console.log(data+': is typing...')
    });
//******************disconnect********************************** */
    socket.on('disconnect',async (datas)=>{
let data=datas;
        console.log("have disconect++++++++++++++++++: "+data);
        
        var  i= await users.findIndex(async(x)=>x===data);
        if(i>1){
        console.log("index of user have disconect "+i)
        users.splice(i,1);
        io.sockets.emit('disconnect2',users);
        console.log(data+" disconnect");
        console.log("all users now :"+users);
    }
        });


//***************image upload ********************** */
var multer  = require('multer');
//had multer howa li taykhlina n uplodiw les fichier l server
var upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, 'uploads/');// hna tat7t dossier fin ghadi ytuploadaw les fichier
      },
      filename: (req, file, cb) => {
          const newFilename = Date.now() + '-'+ file.originalname; // hna tandiro chi format l smiya dyal fichier matalan date+cmiya dyalo bach ykon dakchi unique o maymchwi lina les fichier ila kano bnafs smiya
          cb(null, newFilename);
      },
    })
  });
// hna tandiro smit dak input li 3andna f html momkin tazid chid wa7d ila kan 3andak f html matalan name="fichier"
var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }]);

/*
* Middlewares
*/
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));// hada tandiroh bach n accediw l index.html en general  dakchi li static 
app.use('/uploads',express.static(__dirname + '/uploads')); // HADA tandiroh bach n3tiw navigateur accees l dossier dyal uploads

app.post('/add',cpUpload,(req,res) =>{
    console.log(req.files);
    console.log("test");
    var nom=req.body.nom;
    res.send({
        "path":req.files['image'][0].path.replace('\\','/'), // hna haka tan recuperiw path dyal dak fichier li uploadina
        "message":"image uploaded",
        "url":"localhost:4000/"+req.files['image'][0].path.replace('\\','/')
    });
   var path=req.files['image'][0].path.replace('\\','/');
   var type=req.files['image'][0].mimetype;
        io.sockets.emit('tof',{path,type,nom});
  
});

});
