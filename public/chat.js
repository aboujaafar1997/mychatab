/*************declaration **** */
var mynam;
var socket = io.connect('https://mychatab.herokuapp.com/');
var message= document.getElementById('message');
var btnmessage=document.getElementById('btnmessage');
var nom=document.getElementById('nom');
var btnnom=document.getElementById('btnnom');
var output=document.getElementById('output');
var typ=document.getElementById('typ');
var user=document.getElementById('user');
var btnimage=document.getElementById('btnimage');
var image=document.getElementById('image');
/***************desconect event**************** */
                 $(function() {
  $(window).on('beforeunload', function() {
          socket.emit('disconnect',mynam);
    return '';
         });
          });

//**********animation of box usin jQuery**** */
$(".container").hide();

btnnom.addEventListener('click',()=>{
    mynam=nom.value;
    if (mynam!=""){
        $("#step").hide();   
$(".container").fadeIn("slow");
socket.emit('online',mynam);
}

});
socket.on('online2',(users)=>{
    console.log(users +" : online");
    user.innerHTML=""
    users.forEach((data)=>{
        var random="https://robohash.org/"+Math.floor(Math.random()*4);
        user.innerHTML+='<div ><img style=" border-radius: 50%; width:100px" src="'+random+'" /> <strong style="font-size:30">'+data+" is online </strong></span> </div>";
   
    });
});

btnmessage.addEventListener('click',()=>{
    socket.emit('chat',{
        message:message.value,
        nom:mynam
    });
});
socket.on('chatrom',(data)=>{
    console.log(data.nom);
    if(mynam===data.nom){
        var audio = new Audio('http://talkerscode.com/webtricks/demo/audio_file.mp3');
        audio.play();
        output.innerHTML+='<div ><span class="alert  alert-danger" style="float: right;margin:10px ;border-radius: 15px !important"> '+data.nom+ ': <strong style="font-size:30">'+data.message+" </strong></span> </div>";
        typ.innerHTML="";
        message.value="";
    }else{
        var audio = new Audio('http://talkerscode.com/webtricks/demo/audio_file.mp3');
        audio.play();
        output.innerHTML+='<div ><span class="alert  alert-info" style="float: left;margin:10px ;border-radius: 15px !important"> '+data.nom+ ': <strong style="font-size:30">'+data.message+" </strong></span> </div>";
        typ.innerHTML="";
        message.value="";
    }
});

message.addEventListener("keypress",()=>{
    if(message.value!="")
    socket.emit('typ',mynam);
});

socket.on('typ',(data)=>{
  
    //var audio = new Audio('localhost:3000/sound/typing.mp3');
    audio.play();
    console.log("typing....")
    typ.innerHTML='<div > <strong style="font-size:30">'+data+" is typing ..... </strong></span> </div>"; 
});

    
    socket.on('disconnect',(users)=>{
        console.log(users+"online");
        user.innerHTML=""
        users.forEach((data)=>{
            var random="https://robohash.org/"+Math.floor(Math.random()*4);
            user.innerHTML+='<div ><img style=" border-radius: 50%; width:100px" src="'+random+'" /> <strong style="font-size:30">'+data+" is online </strong></span> </div>";
        });
         });

         

         socket.on('tof',(data)=>{
            console.log(data)
if( data.type==="image/png" ||  data.type==="image/jpeg" || data.type==="image/jpg" || data.type==="image/ico" ){
    var path="https://mychatab.herokuapp.com/"+data.path;
    console.log(path);
        
            if(mynam===data.nom){
                var audio = new Audio('http://talkerscode.com/webtricks/demo/audio_file.mp3');
                audio.play();
                output.innerHTML+='<div ><span class="alert  alert-danger" style= " heigh:400px; width: 200px; float: right;margin:10px ;border-radius: 15px !important"><img id="chatimg" style="float: right;margin:10px" src="'+path+'"class="img-responsive img-thumbnail"> </span> </div>';
         
        }else{
            var audio = new Audio('http://talkerscode.com/webtricks/demo/audio_file.mp3');
            audio.play();
            output.innerHTML+='<div ><span class="alert  alert-info" style= " heigh:400px; width: 200px; float: left;margin:10px ;border-radius: 15px !important"><img id="chatimg" style="float: right;margin:10px" src="'+path+'"class="img-responsive img-thumbnail"> </span> </div>';
            image.value="";
        }
    }


    else{
        if(mynam===data.nom){
            var audio = new Audio('http://talkerscode.com/webtricks/demo/audio_file.mp3');
            audio.play();
            output.innerHTML+='<div ><span class="alert  alert-danger" style= "   float: right;margin:10px ;border-radius: 15px !important"> <a  href="https://mychatab.herokuapp.com/'+data.path+'"> File </a></span> </div>';
     
    }else{
        var audio = new Audio('http://talkerscode.com/webtricks/demo/audio_file.mp3');
        audio.play();
        output.innerHTML+='<div ><span class="alert  alert-info" style= "   float: left;margin:10px ;border-radius: 15px !important"> <a href="localhost:3000/'+data.path+'"> File </a></span> </div>';
        image.value="";
    }

    }
        });

 
      