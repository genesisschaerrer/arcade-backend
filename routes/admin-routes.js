const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Admin = require("../models/admin") 

//create admin
router.post("/register/admin", async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(req.body.password, salt)

    const admin = new Admin({ 
        username: req.body.username,
        password: hashedpass
    }) 
    try {
        const newAdmin = await admin.save()
        res.status(200).json(newAdmin)
    } catch (error) {
        res.status(400).json({messege: error.messege})
    }

})

//login admin
router.post("/login", async (req, res) => {
    const admin = await Admin.findOne({username: req.body.username})

    if(!admin){
        res.status(400).json({messege: "Incorrect username or password"})
    }

    const validPass = await bcrypt.compare(req.body.password, admin.password)

    if(!validPass){
        res.status(400).json({messege: "Incorrect username or password"}) 
    }

    const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET)
    res.status(200).cookie("token", token).send(token)
}) 

//Log Out
router.delete("/logout", (req, res) => {
    res.clearCookie("token").status(200).json({messege: "Logged Out"})
})

//Delete 
router.delete("/delete/admin/:id", (req, res) => {
    const id = req.params.id
    Admin.findByIdAndRemove(id, function (error, doc){ 
        if(error){
            res.status(404).json({messege: "user not found, could not delete"})
        } else {
            res.status(200).json({messege: `admin with id: ${id} has been removed from database`})
        }
    })
})

module.exports = router