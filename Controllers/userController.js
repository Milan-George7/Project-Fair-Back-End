const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    const {username,email,password} = req.body
    console.log("inside register request");
    //check email already exists
 try{
    const existinguser = await users.findOne({email})
    console.log(existinguser);
    if(existinguser){
        res.status(406).json("user already exist!!! Please Login...")
    }else{
        //add user to db
        const newUser = new users({
            username,email,password,profile:"",github:"",linkedin:""
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
 }catch(err){
    res.status(401).json(err)
 }
    
 
}

exports.login = async (req,res)=>{
    const {email,password} = req.body
    console.log("inside login request");
    //check email and password already exists
 try{
    const existinguser = await users.findOne({email,password})
    console.log(existinguser);
    if(existinguser){
        //generate token using jwt
        const token = jwt.sign({userId:existinguser._id},process.env.jwt_secret)
       res.status(200).json({existinguser,token})
    }else{
        res.status(406).json("Invalid email or password")
    }
 }catch(err){
    res.status(401).json(err)
 }
}


//updateprofile
exports.editUser = async (req,res) =>{
    const userId = req.payload
    const {username,password,email,github,linkedin,profileImage} = req.body
    const profile = req.file?req.file.filename:profileImage
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,profile,github,linkedin},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)

    }catch(err){
        res.status(401).json(err)
    }
}