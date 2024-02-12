const jwt = require('jsonwebtoken')

//creating middleware for varifying jwt token
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside JWT Middleware");

    try{
        const token = req.headers['authorization'].split(" ")[1]
        // console.log(token);
        if(token){
            const jwtResponse = jwt.verify(token,process.env.jwt_secret)
            // console.log(jwtResponse);
            req.payload = jwtResponse.userId
            next()
        }else{
            res.status(401).json("please provide token")
        }

    }catch{
        res.status(403).json("please login")
    }
}

module.exports = jwtMiddleware