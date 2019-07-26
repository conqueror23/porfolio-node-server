var express = require('express');
var mongoose = require('mongoose'),
 bodyParser= require('body-parser'),
 app=express();
 require('dotenv').config();

 app.use(bodyParser.json());

 //support parsing of application/x-www-form-urlencoded post data
 app.use(bodyParser.urlencoded({ extended: true }));

 mongoose.connect('mongodb://localhost/'+process.env.DB_NAME, {useNewUrlParser: true});
// router section
const skill = new mongoose.Schema({
    name: String,
    yearOfExp: Number,
    },{versionKey:false}
)
const enquiry = new mongoose.Schema({
    from: String,
    content: String,
    },{versionKey:false}
)

const skillModel = mongoose.model('Skill',skill)
const enquiryModel = mongoose.model('Enquiry',enquiry)


function admVery(req,res){
    if(req.get('token')==process.env.TOKEN){
        return true;
    }else {
        return false;
        res.send("sorry you are not authorized")
    }

}


app.get('/',function(req,res){
    res.send('hello world')
})
// skill ctl
app.get('/skills',(req,res)=>{
    const data = skillModel;
})
app.post('/skills',(req,res)=>{
    var verify = admVery(req,res);
    if(verify){
        var skill = new skillModel({
            name:req.body.skill,
            yearOfExp:req.body.yearOfExp
        })
        skill.save((err,result)=>{
            if(err) console.log(err)
        });
        res.send("skill success saved")
    }else{
        console.log('unauthorized user')

    }
})

// eqnuiry ctl
app.get('/enquiry',(req,res)=>{

})
app.post('/enquiry',(req,res)=>{
    var newEnquiry  =new enquiryModel({
        from:req.body.from,
        content:req.body.content
    })
    newEnquiry.save((err,res)=>{
        if(err) console.log(err)
    })
    res.send('enquiry acquired')
})


 app.listen(3002);
