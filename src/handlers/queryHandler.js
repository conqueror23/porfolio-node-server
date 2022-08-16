

const queryHandler=(req,res)=>{
    const {base} = req.query
    console.log('req',base);
    res.send('query accepted')
}


module.exports = queryHandler
