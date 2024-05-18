const express=require("express")
const router=express.Router();
const {
    login, changePassword,signup
}=require("../controller/user")
const {authMiddleware,isAdmin} = require("../middleware/auth");

router.post("/login", login);
router.post("/signup", signup,login);
router.post("/changePassword",authMiddleware,changePassword)
router.post("/checkAdmin",authMiddleware,isAdmin,(req,res,next)=>{return res.status(200).send("")})
module.exports=router;