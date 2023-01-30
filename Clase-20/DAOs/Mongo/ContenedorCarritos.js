
import carritoModel from '../carritoModel.js'

class ContenedorCarritosDB{
    constructor(){

    }

    async getCarritos(){
        try {
            const carritos= await carritoModel.find({});
            return carritos
        } catch (err) {
            throw new Error(err)
        }
    }


    async createCarrito(newCarrito){
        try {
            await carritoModel.create({productos:newCarrito.productos })
            return await this.getCarritos()
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteCarrito(id){
        try {
            await carritoModel.deleteOne({_id: id.toString()})
            return await this.getCarritos()
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteProductFromCarrito(idCarrito, nameProduct){
        try {
            const carrito= await carritoModel.find({_id: idCarrito.toString()})
            const indexAEliminar= carrito[0].productos.findIndex(elem=> elem.name==nameProduct)
            if(indexAEliminar== -1) return 'Elemento no encontrado'
            else carrito[0].productos.splice(indexAEliminar, 1)
            // return carrito
            
            await carritoModel.updateOne({_id: idCarrito.toString()}, {$set:{productos: carrito[0].productos}})
            return await this.getCarritos()
        } catch (err) {
            throw new Error(err)
        }
    }


    // Falta agregar la funcion de sumar producto al carrito

    async addProductToCarrito(idCarrito, product){
        try{
            const carritos= await carritoModel.find({})
            const index= carritos.findIndex(elem=> elem.id==idCarrito.toString())
            carritos[index].productos.push(product)
            await carritoModel.updateOne({_id: idCarrito.toString()}, {$set:{productos:carritos[index].productos}})
            return await this.getCarritos()
        }
        catch(err){
            throw new Error(err)
        }
    }

}

export default ContenedorCarritosDB