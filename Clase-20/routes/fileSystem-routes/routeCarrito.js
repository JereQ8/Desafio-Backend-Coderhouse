import {Router} from "express";
import ContenedorCarrito from "../../DAOs/FileSystem/ContenedorCarrito.js";

const router= Router();

const contCarritos= new ContenedorCarrito('./DbsFileSystem/carritos.json')


router.get('/carritos', async (req, res)=>{
    const carrito= await contCarritos.getCarritos();
    res.send(carrito)
})

router.get('/carritos/:id', async (req, res)=>{
    const carrito= await contCarritos.getCarritoById(req.params.id);
    res.send(carrito)
})

router.get('/carritos/:id/products', async (req, res)=>{
    const products= await contCarritos.getProductsFromCarrito(req.params.id)
    res.send(products)
})

router.post('/carritos', async (req, res)=>{
    const carritoNuevo= await contCarritos.addNewCarrito(req.body)
    res.send(carritoNuevo)
})

router.delete('/carritos/:id', async (req, res)=>{
    await contCarritos.deleteCarrito(req.params.id)
    const carritos= await contCarritos.getCarritos();
    res.send(carritos)
})

router.put('/carritos/:id', async (req, res)=>{
    await contCarritos.vaciarCarrito(req.params.id);
    const carritos= await contCarritos.getCarritos();
    res.send(carritos)
})

router.delete('/carritos/:idcarr/products/:idprod', async (req, res)=>{
    await contCarritos.deleteProductFromCarrito(req.params.idcarr, req.params.idprod);
    const carritos= await contCarritos.getCarritos();
    res.send(carritos)
})

export default router