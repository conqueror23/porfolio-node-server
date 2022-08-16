var express = require('express');
var mongoose = require('mongoose'),
 bodyParser= require('body-parser'),
 app=express();
 require('dotenv').config();


var queryHandler = require('./src/handlers/queryHandler')

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

const project = new mongoose.Schema({
    name: String,
    description: String,
    img:String,
    },{versionKey:false}
)

const skillModel = mongoose.model('Skill',skill)
const enquiryModel = mongoose.model('Enquiry',enquiry)
const projectModel = mongoose.model('Project',project)



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

//query api
app.get('/:query?',queryHandler)


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

// project ctl
app.post('/project',(req,res)=>{
    console.log(req)
    res.send('you have send requsst with'+req.body)
})



app.post('/project/create',(req,res)=>{
    vary = admVery(req.get('token'))
    if(very){
        var newProject =new projectModel({
            name:req.body.name,
            description:req.body.description,
            img:req.body.imgUrl 
        })
        newProject.save((err,data)=>{
            if(err) res.send("saving errors")
            console.log(data)
        })
        res.send('saved success')

    }else{
        res.send('your are not authorised')
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

const port  =3002
app.listen(port,()=>{
    console.log('listening port:',port);
});
