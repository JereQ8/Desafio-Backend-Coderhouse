import mongoose from "mongoose";
import productModel from "../productModel.js";

class ContenedorProductosDB{

    async createProduct(product){
        try{
            await productModel.create({name:product.name, price: product.price})
            return await this.getProducts();
        }
        catch(err){
            throw new Error(err)
        }
    }

    async getProducts(){
        try{
            const productos=await productModel.find({})
            return productos
        }
        catch(err){
            throw new Error(err)
        }
        
        
    }

    async getProduct(id){
        try {
            const product= await productModel.find({_id: id.toString()})
            return product
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteProduct(id){
        try{
            await productModel.deleteOne({_id:id})
            return await this.getProducts()
        }
        catch(err){
            throw new Error(err)
        }
    }

    async updateProduct(id, newProduct){
        try{
            await productModel.updateOne({_id: id.toString()}, {$set:{ name: newProduct.name || name, price:newProduct.price || price }})
            return await productModel.findById(id.toString())
        }
        catch(err){
            throw new Error(err)
        }
    }


}

export default ContenedorProductosDB