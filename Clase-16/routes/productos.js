const express= require("express")
const {Router}= require("express")
const router= Router()
const {db} =require("../server.js")
const knex= require("knex")



router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get("/api/productos", async (req, res, next)=>{
    console.log(db)
    // let productos= await db.returnProducts()
    // await res.json(productos)
    
})
 


module.exports= router