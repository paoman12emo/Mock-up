const express = require("express")
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
const userDB = [{username: "tom123", password:"qwer"},{username: "jone14", password:"abcd"},{username: "yoyo55", password:"5555"}]
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sender@gmail.com',
      pass: 'senderpassword'
    }
  });
const mailOptions = {
    from: 'sender@gmail.com',
    to: 'receiver@gmail.com',
    subject: 'Approve Status',
    text: 'All Approve'
  };


  const approveDB =[]
  const allApprove=[ 'true', 'true', 'true' ]

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/login.html")
})


app.post("/",(req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    userDB.forEach((item)=>{
        let usernameDB= item.username;
        let passwordDB= item.password;
     
        if(username===usernameDB){
            if(password===passwordDB){
                res.redirect("/form")
            }
        }
     })
    

})

app.get("/form",(req,res)=>{
    res.sendFile(__dirname+"/form.html")
})

app.post("/form",(req, res)=>{
    let result= req.body.approve;
    approveDB.push(result); 
    console.log(approveDB);
    if(approveDB.length==3 && approveDB.every((item,index)=>{
        return (item===allApprove[index]);
    })){
        
        
    transporter.sendMail(mailOptions,(error, info)=>{
        if (error) {
        console.log(error);
        } else {
      console.log('Email sent: ' + info.response);
    }
  });
    }
    
    res.redirect("/")
})







app.listen(3000,function(){
    console.log("Server is online");
  });
  


  transporter.sendMail(mailOptions,(error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });