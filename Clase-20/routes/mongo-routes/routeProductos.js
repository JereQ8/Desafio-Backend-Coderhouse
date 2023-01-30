import { Router } from "express";
import ContenedorProductosDB from "../../DAOs/Mongo/ContenedorProductos.js";

const router= Router()

const productos= new ContenedorProductosDB()

router.get('/products',async (req, res)=>{
    const products= await productos.getProducts()
    res.send(products)
})

router.get('/products/:id',async (req, res)=>{
    const product= await productos.getProduct(req.params.id)
    res.send(product)
})

router.post('/products', async (req, res)=>{
    const products= await productos.createProduct(req.body)
    res.send(products)
    console.log('Elemento Creado')
})

router.delete('/products/:id', async (req, res)=>{
    const product= await productos.deleteProduct(req.params.id.toString())
    res.send(product)
    console.log('Elemento Eliminado')
})

router.put('/products/:id', async (req, res)=>{
    const product= await productos.updateProduct(req.params.id, req.body);
    res.send(product)
})


export default router