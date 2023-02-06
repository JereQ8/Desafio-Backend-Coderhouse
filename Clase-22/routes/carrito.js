const {Router}= require("express")
const router= Router()
const {db}= require("../server")

router.get("/api/carrito", (req, res)=>{
    res.send("Hola mundo")
    console.log(db)
})



module.exports= router