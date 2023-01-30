import mongoose from "mongoose";

const collection= 'carrito'

const modelo=new mongoose.Schema({
    productos: Array
})

const productModel= mongoose.model(collection, modelo)

export default productModel