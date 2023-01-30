import {Router} from "express";
// import ContenedorProductos from "../DAOs/FileSystem/ContenedorProductos.js";
import ContenedorProductosDB from '../../DAOs/Mongo/ContenedorProductos.js'


const router= Router();
// const productos= new ContenedorProductos('./DbsFileSystem/productos.json')
const productos= new ContenedorProductosDB()

router.get('/products', async (req, res)=>{
    const products= await productos.getProducts();
    res.send(products)
})

router.get('/products/:id', async (req, res)=>{
    const producto= await productos.getProductById(req.params.id);
    res.send(producto)

})

router.delete('/products/:id',async (req, res)=>{
    const eliminado= await productos.deleteById(req.params.id)
    res.send(eliminado)

})

router.put('/products/:id', async (req, res)=>{
    await productos.update(req.params.id, req.body);
    const products= await productos.getProducts();
    res.send(products)
})

export default router

