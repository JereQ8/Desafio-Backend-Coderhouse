import mongoose from "mongoose";

const collection= 'productos'

const modelo=new mongoose.Schema({
    name: String,
    price: Number,
})

const productModel= mongoose.model(collection, modelo)

export default productModel