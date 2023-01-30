import { Router } from "express";
import ContenedorCarritosDB from "../../DAOs/Mongo/ContenedorCarritos.js";

const carritos= new ContenedorCarritosDB()



const router= Router()


router.get('/carritos', async (req, res)=>{
    const listCarritos= await carritos.getCarritos()
    res.send(listCarritos)
})

router.post('/carritos', async (req, res)=>{
    const listCarritos= await carritos.createCarrito(req.body)
    res.send(listCarritos)
})

router.delete('/carritos/:id',async (req, res)=>{
    const listCarritos= await carritos.deleteCarrito(req.params.id)
    res.send(listCarritos)
})

router.delete('/carritos/:id/products/:nameProduct',async (req, res)=>{
    const listCarritos= await carritos.deleteProductFromCarrito( req.params.id.toString(), req.params.nameProduct.toString());
    res.send(listCarritos)
})

router.post('/carritos/:id/products',async (req, res)=>{
    const newProduct= await carritos.addProductToCarrito(req.params.id, req.body)
    res.send(newProduct)
})


export default router