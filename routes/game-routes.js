const express = require("express")
const router = express.Router()

const Game = require("../models/game") 
const verify = require("../verify")

//get all games
router.get("/", verify, async (req, res) => {
    try {
        const game = await Game.find()
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//post 
router.post("/", async (req, res) => {
    const game = new Game({
        name: req.body.name,
        url: req.body.url,
        image: req.body.image,
        creator: req.body.creator
    })
    try{
        const newGame = await game.save()
        res.status(200).json({newGame})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//get one
router.get("/:id", async (req, res) => {
    try{
        const game = await Game.findById(req.params.id)
        if(game == null) {
            return res.status(404).json({message: "game doesnt exist"})
        } else {
            res.status(200).json(game)
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }    
})

//delete 
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    await Game.findByIdAndRemove(id, function(err, docs){
    if(err){
        console.log(err)
    } else {
        res.status(200).json({message: `Game ${id} has been deleted`})  
        }
    })
})

module.exports = router