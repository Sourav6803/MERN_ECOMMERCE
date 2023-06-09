
const jwt=require('jsonwebtoken');
const userModel = require('../models/userModel');


//.........................MIDDLEWARE-FOR AUTHENTICATION..........................................................

const auth= async (req,res,next) =>{
    try{
    let bearerToken= req.headers.authorization;
    if(!bearerToken) return res.status(401).send({ status: false, message: "Please, provide the token" });
   
    let bearer = bearerToken.split(' ')
    let token = bearer[1];

     let decodedToken = jwt.verify(token, "group09" )
    //  const user = userModel.findById((decodedToken.id))
    //  , function(err , data){
    //    if(err) return res.status(401).send({ status: false, message: "Incorrect Token" })
    //   });
      // req.user = user
      req.userId = decodedToken.userId
      
  next(); 

  } catch (err) {
    if(err.message=="invalid token") return res.status(401).send({status:false, msg:"invalid token"})
    if(err.message=="invalid signiture") return res.status(401).send({status:false, msg:"invalid signiture"})
    res.status(500).send({ status: false, error: err.message });
  }};

  module.exports.auth = auth