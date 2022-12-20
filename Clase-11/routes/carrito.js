import { Router } from "express";
// import productos from "../server";
const router= Router()

const carritos= []


router.post("/api/carrito", (req, res)=>{
    let ids= []
    if(carritos.length=== 0){
        carritos.push({
            id:1,
            products:[]
        })
        res.json(carritos)
        return carritos[0].id
    }

    else{
        carritos.forEach(car=>{
            ids.push(car.id)
        })

        let indice= Math.max(...ids) + 1
        carritos.push({
            id:indice,
            products:[]
        })
        res.json(carritos)
        return indice
    }


})

router.delete("/api/carrito/:id", (req, res)=>{
    // let ids= []
    // carritos.forEach(car=>{
    //     ids.push(car.id)
    // })
    let indice= carritos.findIndex(car=> car.id==req.params.id);
    carritos.splice(indice, 1)
    res.json(carritos)
})

router.get("/api/carrito/:id/productos", (req, res)=>{
    let indice= carritos.findIndex(car=> car.id==req.params.id);
    res.json(carritos[indice].products)
})

router.post("/api/carrito/:id/productos", (req, res)=>{
    let idsCarrito= []
    // Obtengo el indice del carrito al cual deseo agregar el producto
    let indice= carritos.findIndex(car=> car.id==req.params.id);
    // Obtengo los ids de la lista de productos y los pusheo en "idsCarrito"
    carritos[indice].products.forEach(prod=>{
        idsCarrito.push(prod.id)
    })
    // pusheo el req.body a la lista de productos y para el id de producto
    // consigo el id mas grande de la lista de productos que ya tiene el 
    // carrito y a ese numero le sumo 1 y de esa manera tengo un nuevo id

    if(idsCarrito.length === 0){
        carritos[indice].products.push({...req.body, id:1})    
    }
    else{
        carritos[indice].products.push({...req.body, id:Math.max(...idsCarrito) + 1})
    }
    
    res.json(carritos[indice].products)
})

router.delete("/api/carrito/:id/productos/:id_prod",(req, res)=>{
    let indiceCarrito= carritos.findIndex(car=> car.id==req.params.id);
    let indiceProducto= carritos[indiceCarrito].products.findIndex(prod=> prod.id== req.params.id_prod)
    carritos[indiceCarrito].products.splice(indiceProducto, 1)
    res.json(carritos[indiceCarrito].products)
})


export default router