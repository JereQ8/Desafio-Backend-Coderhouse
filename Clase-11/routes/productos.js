import express from "express"
import { Router } from "express"
import productos from "../server.js"
const router= Router()


router.use(express.json())

router.get("/api/productos", (req, res)=>{
    res.json(productos.productos)
})

router.put("/api/productos/:id", (req, res)=>{
    if(productos.administrador){
        let index = productos.productos.findIndex((product)=>product.id == req.params.id)
        productos.productos[index]= {...productos.productos[index], name: req.body.name, price:req.body.price, thumbnail:req.body.thumbnail }
        res.json(productos.productos[index])
    }
    else{
        res.json({error:-1,
            description:"Ruta '/api/productos/:id' no autorizada",
            method: req.method
        })
    }
    
})

router.get("/api/productos/:id", (req, res)=>{
    let found= productos.productos.find((product)=> product.id == req.params.id)
    res.json(found)
})

router.post("/api/productos", (req, res)=>{
    if(productos.administrador){
        let ids= []
        productos.productos.forEach(producto=>ids.push(producto.id))
        productos.productos.push({...req.body, id: Math.max(...ids) + 1 })
        res.send("Elemento sumado")
    }
    else{
        res.json({error:-1,
            description:"Ruta '/api/productos' no autorizada",
            method: req.method
        })
    }
    
})

router.delete("/api/productos/:id", (req, res)=>{
    if(productos.administrador){
        let index = productos.productos.findIndex((product)=>product.id == req.params.id)
        productos.productos.splice(index, 1)
        res.json(productos.productos)
    }
    else{
        res.json({error:-1,
            description:"Ruta '/api/productos/:id' no autorizada",
            method: req.method
        })
    }
    
})

export default router 