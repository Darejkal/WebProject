const generateToken = require("../config/jwtToken")
const User = require("../model/user")
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler")

module.exports={
    login:asyncHandler(async (request, response) => {
        const user = await User.findOne({ email:email });
        if (!(user && customEncryptCompare(password,user.password))) {
            response.status(401).send({
                message:"Login failure",
            })
        }
    
        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ 
            sub: user.id,
            position:user.position
        }, process.env.JWT_SECRET!, { expiresIn: '7d' });

        if(currentUser && (await currentUser.isPasswordMatched(password))){
            response.status(200).send({
                message: "Login Successfully",
                currentUser:{
                    "role":currentUser.role,
                    "position":currentUser.position,
                    "_id":currentUser._id,
                    "email":currentUser.email,
                },
                token: generateToken(currentUser._id),
            })
        }else{

        }
    }),
    changePassword:asyncHandler(async (request, response) => {
        const { email, oldPassword, newPassword } = request.body;
    
        // Find the user by email
        const currentUser = await User.findOne({ email: email });
    
        if (currentUser && (await currentUser.isPasswordMatched(oldPassword))) {
            // Check if oldPassword matches the current password
    
            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
            // Update the user's password
            const updatedUser = await User.findOneAndUpdate(
                { _id: request.user._id },
                { password: hashedNewPassword }
            );
    
            response.status(200).send({
                message: 'Password changed successfully',
                updatedUser,
                token: generateToken(updatedUser._id),
            });
        } else {
            response.status(401).send({
                message: 'Invalid credentials or old password does not match',
            });
        }
    }),
    createUser:asyncHandler(async (req, res) => {
        response.status(401).send({
            message:"Not implemented",
        })
    })
    ,signup:asyncHandler(async (req, res,next) => {
        console.log("SignUp:",req.body);
        const newUser=await User.create(req.body);
        next()
    })
}
