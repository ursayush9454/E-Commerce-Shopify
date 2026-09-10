const jwt= require("jsonwebtoken");

const authmiddleWare=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization


        if(!authHeader){
            return res.status(401).json({
                message:"Acess denied no Token Provided",
            })
        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Acess Denied Invalid Token Formet",
            });
        };
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch(error){
        return res.status(401).json({
            message:"Invalid or Experied Token "
        });
    }
};
module.exports=authmiddleWare;